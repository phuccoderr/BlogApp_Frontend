import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { Message } from "../../gql/graphql";

const Chat = () => {
  const { _id } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const chatId = _id!;

  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: existingMessages } = useGetMessages({ chatId });
  useMessageCreated({ chatId });

  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (existingMessages) {
      setMessages(existingMessages.messages);
    }
  }, [existingMessages]);

  // useEffect(() => {
  //   const existingLatestMessages = messages[message.length - 1]?._id;
  //   if (
  //     latestMessage?.messageCreated &&
  //     existingLatestMessages !== latestMessage?.messageCreated._id
  //   ) {
  //     setMessages([...messages, latestMessage.messageCreated]);
  //   }
  // }, [latestMessage]);

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {[...messages]
          .sort(
            (mesA, mesB) =>
              new Date(mesA.createdAt).getTime() -
              new Date(mesB.createdAt).getTime()
          )
          .map((m) => (
            <Grid container alignItems="center" marginBottom="1rem">
              <Grid item xs={2} lg={1}>
                <Avatar src="" sx={{ width: 52, height: 52 }} />
              </Grid>
              <Grid item xs={10} lg={11}>
                <Stack>
                  <Paper sx={{ width: "fit-content" }}>
                    <Typography sx={{ padding: "0.9rem" }}>
                      {m.content}
                    </Typography>
                  </Paper>
                  <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;

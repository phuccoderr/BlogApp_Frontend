import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { getMessageDocument } from "./useGetMessages";
import { updateMessages } from "../cache/messages";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = () => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      if (data?.createMessage) {
        updateMessages(cache, data.createMessage);
      }
      // const messageQueryOptions = {
      //   query: getMessageDocument,
      //   variables: {
      //     chatId,
      //   },
      // };
      // const messages = cache.readQuery({
      //   ...messageQueryOptions,
      // });
      // if (!messages || !data?.createMessage) {
      //   return;
      // }
      // cache.writeQuery({
      //   ...messageQueryOptions,
      //   data: {
      //     messages: messages.messages.concat([data?.createMessage]),
      //   },
      // });
    },
  });
};

export { useCreateMessage };

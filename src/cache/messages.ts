import { ApolloCache } from "@apollo/client";
import { Message } from "../gql/graphql";
import { getMessageDocument } from "../hooks/useGetMessages";

export const updateMessages = (cache: ApolloCache<any>, message: Message) => {
  const messageQueryOptions = {
    query: getMessageDocument,
    variables: {
      chatId: message.chatId,
    },
  };
  const messages = cache.readQuery({
    ...messageQueryOptions,
  });
  cache.writeQuery({
    ...messageQueryOptions,
    data: {
      messages: (messages?.messages || []).concat(message),
    },
  });
};

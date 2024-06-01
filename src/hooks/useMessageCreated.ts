import { gql, useSubscription } from "@apollo/client";
import { SubscriptionMessageCreatedArgs } from "../gql/graphql";
import { updateMessages } from "../cache/messages";

const messageCreatedDocument = gql(`
  subscription messageCreated($chatId: String!) {
    messageCreated(chatId: $chatId) {
      _id
      content
      createdAt
      chatId
      userId
    }
  }
`);

export const useMessageCreated = (
  variables: SubscriptionMessageCreatedArgs
) => {
  return useSubscription(messageCreatedDocument, {
    variables,
    onData: ({ client, data }) => {
      if (data.data) {
        updateMessages(client.cache, data.data.messageCreated);
      }
    },
  });
};

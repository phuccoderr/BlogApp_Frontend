import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { MessageFragment } from "../fragments/message.fragment";
import { getMessageDocument } from "./useGetMessages";

const createMessageDocument = graphql(`
  mutation CreateMessage($createMessageInput: CreateMessageInput!) {
    createMessage(createMessageInput: $createMessageInput) {
      ...MessageFragment
    }
  }
`);

const useCreateMessage = (chatId: string) => {
  return useMutation(createMessageDocument, {
    update(cache, { data }) {
      const messageQueryOptions = {
        query: getMessageDocument,
        variables: {
          chatId,
        },
      };
      const messages = cache.readQuery({
        ...messageQueryOptions,
      });
      if (!messages || !data?.createMessage) {
        return;
      }
      cache.writeQuery({
        ...messageQueryOptions,
        data: {
          messages: messages.messages.concat([data?.createMessage]),
        },
      });
    },
  });
};

export { useCreateMessage };

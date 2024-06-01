import { useMutation } from "@apollo/client";
import { graphql } from "../gql";
import { ChatFragment } from "../fragments/chat.fragment";
import { getChatsDocument } from "./useGetChats";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      ...ChatFragment
    }
  }
`);

const useCreateChat = () => {
  return useMutation(createChatDocument, {
    refetchQueries: [
      {
        query: getChatsDocument,
      },
    ],
  });
};

export { useCreateChat };

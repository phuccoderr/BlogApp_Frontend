import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { MessagesQueryVariables } from "../gql/graphql";

export const getMessageDocument = graphql(`
  query Messages($chatId: String!) {
    messages(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);

const useGetMessages = (variables: MessagesQueryVariables) => {
  return useQuery(getMessageDocument, { variables });
};

export { useGetMessages };

const extractErrorMessage = (error: any) => {
  const errorMessage =
    error.graphQLErrors[0]?.extensions?.originalError?.message;
  if (Array.isArray(errorMessage)) {
    return errorMessage[0];
  } else {
    return errorMessage;
  }
};

export default extractErrorMessage;

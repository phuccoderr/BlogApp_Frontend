import { SnackMessage } from "../interface/snake-message.interface";

const UNKNOWN_ERROR_MESSAGE =
  "An unknow error has occured. Please try again later.";

const UNKNOWN_ERROR_SNAKE_MESSAGE: SnackMessage = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error",
};

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNAKE_MESSAGE };

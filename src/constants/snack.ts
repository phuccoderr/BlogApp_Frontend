import { makeVar } from "@apollo/client";
import { SnackMessage } from "../interface/snake-message.interface";

export const snackVar = makeVar<SnackMessage | undefined>(undefined);

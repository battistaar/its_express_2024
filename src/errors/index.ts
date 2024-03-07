import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found";

export const errorHandlers = [notFoundHandler, genericHandler];
import { genericHandler } from "./generic";
import { notFoundHandler } from "./not-found";
import { validationErrorHandler } from './validation';

export const errorHandlers = [notFoundHandler, validationErrorHandler, genericHandler];
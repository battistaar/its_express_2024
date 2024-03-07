import { isObjectIdOrHexString } from "mongoose";

export function isPopulated<T extends {id: string}>(arg: string | T): arg is T {
  return !isObjectIdOrHexString(arg);
}
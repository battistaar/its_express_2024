export function isPopulated<T extends {id: string}>(arg: string | T): arg is T {
  return !!(arg as T).id;
}
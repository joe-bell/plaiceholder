import { classNamePrefix } from "./config";

export const extractImagePath = (plaiceholderClass: string) =>
  plaiceholderClass
    .replace([classNamePrefix, "["].join(""), "")
    .replace("]", "");

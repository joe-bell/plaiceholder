import { classNamePrefix } from "./config";

export const extractImgSrc = (plaiceholderClass: string) =>
  plaiceholderClass
    .replace([classNamePrefix, "-["].join(""), "")
    .replace("]", "");

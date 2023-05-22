import { classNamePrefix } from "./config.js";

export const extractImgSrc = (plaiceholderClass: string) =>
  plaiceholderClass
    .replace([classNamePrefix, "-["].join(""), "")
    .replace("]", "");

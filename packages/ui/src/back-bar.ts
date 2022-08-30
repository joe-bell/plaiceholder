import { cva } from "class-variance-authority";

// (Short for admiralBackBar)
export const backBar = cva(["mt-10", "py-4", "border-t"]);

export const backBarLink = cva([
  "inline-flex",
  "items-center",
  "text-gray-500",
  "hover:text-gray-900",
  "transition-colors",
  "duration-200",
  "gap-2",
]);

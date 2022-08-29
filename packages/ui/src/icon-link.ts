import { cva } from "class-variance-authority";

export const iconLink = cva([
  "text-gray-500",
  "hover:text-gray-900",
  "transition-colors",
  "duration-200",
]);

export const iconLinkLabel = cva(["sr-only"]);

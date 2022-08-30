import { cva } from "class-variance-authority";

export const logo = cva(["inline-flex", "items-center", "hover:opacity-75"]);

export const logoBrand = cva(["mr-2", "text-xl", "font-medium", "md:inline"]);

export const logoIcon = cva([
  "mr-2",
  "md:inline",
  "hidden",
  "[&_>_*]:w-[2.5rem]",
]);

export const logoTitle = cva(["text-gray-600", "text-xl", "md:inline"]);

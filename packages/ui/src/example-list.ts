import { cva } from "class-variance-authority";

export const exampleList = cva([
  "mt-8",
  "grid",
  "sm:grid-cols-2",
  "md:grid-cols-3",
  "gap-4",
  "place-content-stretch",
  "text-center",
]);

export const exampleListItem = cva([
  "group",
  "rounded-md",
  "border",
  "border-gray-200",
  "shadow-sm",
  "grid",
  "rounded-lg",
  "relative",
  "overflow-hidden",
  "w-full",
  "h-full",
]);

export const exampleLQIP = cva([
  "absolute",
  "inset-0",
  "w-full",
  "h-full",
  "filter",
  "blur-xl",
  "transform",
  "scale-150",
]);

export const exampleBody = cva([
  "relative",
  "flex",
  "aspect-[16/9]",
  "items-end",
]);

export const exampleTitle = cva([
  "absolute",
  "bottom-0",
  "px-4",
  "text-white",
  "font-bold",
  "text-2xl",
  "top-auto",
  "h-[unset]",
  "flex-1",
  "text-left",
]);

export const exampleNav = cva(["grid", "grid-cols-2", "gap-4", "p-4", "z-10"]);

export const exampleNavItem = cva();

export const exampleLink = cva([
  "block",
  "appearance-none",
  "px-4",
  "py-2",
  "text-gray-700",
  "font-medium",
  "text-sm",
  "bg-white",
  "bg-opacity-80",
  "hover:bg-opacity-100",
  "focus:bg-opacity-100",
  "hover:text-gray-800",
  "focus:text-gray-800",
  "rounded-md",
  "capitalize",
  "shadow-sm",
  "transition-colors",
  "duration-200",
  "outline-none",
  "focus:ring",
]);

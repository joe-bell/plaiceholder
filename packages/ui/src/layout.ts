import { cva } from "class-variance-authority";

const container = ["max-w-5xl", "mx-auto", "px-4", "w-full"];

export const layoutHeader = cva([
  "bg-white",
  "border-b",
  "border-gray-300",
  "py-4",
  "z-10",
]);

export const layoutHeaderContainer = cva([
  ...container,
  "flex",
  "justify-between",
  "items-center",
]);

export const layoutMain = cva([...container, "mt-6", "pb-20", "text-gray-800"]);

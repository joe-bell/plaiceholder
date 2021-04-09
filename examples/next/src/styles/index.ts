import { createCx } from "@joebell/cx";

const shortcuts = {
  "c-container": ["max-w-5xl", "mx-auto", "px-4"],
  "c-icon": ["w-6", "h-6"],
  "c-icon-link": [
    "text-gray-600",
    "hover:text-gray-900",
    "transition",
    "duration-200",
  ],
  "c-radio": ["block"],
  "c-radio__input": ["mr-3"],
  "c-input-text": [
    "shadow",
    "appearance-none",
    "border",
    "rounded",
    "w-full",
    "py-2",
    "px-3",
    "text-gray-700",
    "leading-tight",
    "focus:outline-none",
    "focus:shadow-outline",
  ],
  "c-text--step": ["font-bold", "text-xl", "block", "text-center"],
};

export const cx = createCx(shortcuts);

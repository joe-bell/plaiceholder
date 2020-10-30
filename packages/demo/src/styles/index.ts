import { createCx } from "@joebell/cx";

const shortcuts = {
  "c-container": ["max-w-4xl", "mx-auto", "px-4"],
  "c-icon": ["w-6", "h-6"],
  "c-icon-link": [
    "text-gray-600",
    "hover:text-gray-900",
    "transition",
    "duration-200",
  ],
};

export const cx = createCx(shortcuts);

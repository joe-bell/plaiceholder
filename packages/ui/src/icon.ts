import { cva } from "class-variance-authority";

export const icon = cva(null, {
  variants: { size: { 4: ["h-4", "w-4"], 6: ["h-6", "w-6"] } },
  defaultVariants: { size: 6 },
});

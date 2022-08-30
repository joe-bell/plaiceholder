import { cva } from "class-variance-authority";

export const imageList = cva(
  ["grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mt-8"],
  {
    variants: {
      aspect: {
        auto: "[--image-list-aspect:auto]",
        "5/7": "[--image-list-aspect:5/7]",
      },
      columns: { 2: null, 3: "md:grid-cols-3" },
    },
    defaultVariants: { aspect: "auto", columns: 3 },
  }
);

export const imageListItem = cva([
  "aspect-[var(--image-list-aspect)]",
  "relative",
  "block",
  "overflow-hidden",
  "[&_img]:text-transparent",
]);

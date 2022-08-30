import { cva } from "class-variance-authority";

export const article = cva(["max-w-sm", "sm:max-w-none", "mx-auto"]);

export const articleHeader = cva(["space-y-2"]);

export const articleHeaderTitle = cva(["font-bold", "mt-10"], {
  variants: {
    size: {
      alpha: "text-4xl",
      beta: "text-3xl",
    },
  },
  defaultVariants: {
    size: "alpha",
  },
});

export const articleHeaderSubtitle = cva([
  "font-light",
  "text-gray-600",
  "text-2xl",
]);

export const articleContent = cva();

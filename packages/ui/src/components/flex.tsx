import React from "react";
import type * as CVA from "class-variance-authority";
import { cva } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

const flex = cva("flex", {
  variants: {
    direction: { row: "flex-row", column: "flex-col" },
    gap: { 2: null, 4: null },
  },
  compoundVariants: [
    // row
    { direction: "row", gap: 2, class: "space-x-2" },
    { direction: "row", gap: 4, class: "space-x-4" },
    // column
    { direction: "column", gap: 2, class: "space-y-2" },
    { direction: "column", gap: 4, class: "space-y-4" },
  ],
  defaultVariants: {
    direction: "row",
    gap: 4,
  },
});

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CVA.VariantProps<typeof flex> {
  asChild?: boolean;
}

export const Flex: React.FC<FlexProps> = ({
  asChild,
  className,
  direction,
  gap,
  ...props
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={flex({ class: className, direction, gap })} {...props} />
  );
};

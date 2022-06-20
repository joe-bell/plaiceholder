import type * as CVA from "class-variance-authority";
import { cva } from "class-variance-authority";
import React from "react";

const imageGrid = cva(
  ["grid", "grid-cols-1", "sm:grid-cols-2", "gap-4", "mt-8"],
  {
    variants: { columns: { 2: null, 3: "md:grid-cols-3" } },
    defaultVariants: { columns: 3 },
  }
);

export interface ImageGridProps
  extends React.HTMLAttributes<HTMLUListElement>,
    CVA.VariantProps<typeof imageGrid> {}

export const ImageGrid: React.FC<ImageGridProps> = ({
  className,
  columns = 3,
  ...props
}) => (
  <ul
    role="list"
    className={imageGrid({ class: className, columns })}
    {...props}
  />
);

const imageGridItem = cva([
  "relative",
  "block",
  "overflow-hidden",
  // See src/styles/index.css
  "next-image",
]);

export interface ImageGridItemProps
  extends React.HTMLAttributes<HTMLLIElement>,
    CVA.VariantProps<typeof imageGridItem> {}

export const ImageGridItem: React.FC<ImageGridItemProps> = ({
  className,
  ...props
}) => <li className={imageGridItem({ class: className })} {...props} />;

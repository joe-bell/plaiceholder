import React from "react";
import type * as CVA from "class-variance-authority";
import { cva, cx } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export interface ArticleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Article: React.FC<ArticleProps> = ({ className, ...props }) => (
  <article
    className={cx("max-w-sm", "sm:max-w-none", "mx-auto", className)}
    {...props}
  />
);

const articleHeading = cva(["font-bold", "mt-10"], {
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

export interface ArticleHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    CVA.VariantProps<typeof articleHeading> {}

export const ArticleHeading: React.FC<ArticleHeadingProps> = ({
  className,
  size,
  ...props
}) => <h1 className={articleHeading({ size, class: className })} {...props} />;

export interface ArticleSubheadingProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export const ArticleSubheading = React.forwardRef<
  HTMLHeadingElement,
  ArticleSubheadingProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "h2";
  return (
    <Comp
      ref={ref}
      className={cx(
        "font-light",
        "text-gray-600",
        "text-2xl",
        "mt-2",
        className
      )}
      {...props}
    />
  );
});

export interface ArticleContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ArticleContent: React.FC<ArticleContentProps> = (props) => (
  <div {...props} />
);

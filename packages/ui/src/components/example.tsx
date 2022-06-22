import React from "react";
import { cx } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export interface ExamplesProps extends React.HTMLAttributes<HTMLUListElement> {}

export const Examples: React.FC<ExamplesProps> = ({ className, ...props }) => (
  <ul
    role="list"
    className={cx(
      "mt-8",
      "grid",
      "sm:grid-cols-2",
      "md:grid-cols-3",
      "gap-4",
      "place-content-stretch",
      "text-center",
      className
    )}
    {...props}
  />
);

export interface ExampleProps extends React.HTMLAttributes<HTMLLIElement> {}

export const Example: React.FC<ExampleProps> = ({ className, ...props }) => (
  <li
    className={cx(
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
      className
    )}
    {...props}
  />
);

export interface ExamplePlaiceholderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  plaiceholder: React.CSSProperties;
}

export const ExamplePlaiceholder: React.FC<ExamplePlaiceholderProps> = ({
  className,
  plaiceholder,
  style,
  ...props
}) => (
  <div
    className={cx(
      "absolute",
      "inset-0",
      "w-full",
      "h-full",
      "filter",
      "blur-xl",
      "transform",
      "scale-150",
      className
    )}
    style={Object.assign({}, plaiceholder, style)}
    {...props}
  />
);

export interface ExampleTitleProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ExampleTitle: React.FC<ExampleTitleProps> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={cx("relative", "flex", "aspect-w-16", "aspect-h-9", "items-end")}
    {...props}
  >
    <span
      className={cx(
        "absolute",
        "bottom-0",
        "px-4",
        "text-white",
        "font-bold",
        "text-2xl",
        "top-auto",
        "h-[unset]",
        "flex-1",
        "text-left"
      )}
    >
      {children}
    </span>
  </p>
);

export interface ExampleNavProps
  extends React.HTMLAttributes<HTMLUListElement> {}

export const ExampleNav: React.FC<ExampleNavProps> = ({
  className,
  ...props
}) => (
  <ul
    className={cx("grid", "grid-cols-2", "gap-4", "p-4", "z-10")}
    {...props}
  />
);

export interface ExampleNavItemProps
  extends React.HTMLAttributes<HTMLLIElement> {}

export const ExampleNavItem: React.FC<ExampleNavItemProps> = (props) => (
  <li {...props} />
);

export interface ExampleLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export const ExampleLink = React.forwardRef<
  HTMLAnchorElement,
  ExampleLinkProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cx(
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
        className
      )}
      {...props}
    />
  );
});

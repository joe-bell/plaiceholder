import React from "react";
import { cx } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export interface BackBarProps extends React.HTMLAttributes<HTMLUListElement> {}

// (Short for Admiral BackBar)
export const BackBar: React.FC<BackBarProps> = ({ className, ...props }) => (
  <nav
    role="list"
    className={cx("mt-10", "py-4", "border-t", className)}
    {...props}
  />
);

export interface BackBarLinkProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export const BackBarLink = React.forwardRef<
  HTMLAnchorElement,
  BackBarLinkProps
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      ref={ref}
      className={cx(
        "inline-flex",
        "items-center",
        "text-gray-500",
        "hover:text-gray-900",
        "transition-colors",
        "duration-200",
        "gap-2",
        className
      )}
      {...props}
    />
  );
});

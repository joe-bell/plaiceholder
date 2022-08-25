import React from "react";
import { cx } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

export interface LogoProps extends React.HTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean;
}

export const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (
      <Comp
        ref={ref}
        className={cx(
          "inline-flex",
          "items-center",
          "hover:opacity-75",
          className
        )}
        {...props}
      />
    );
  }
);

export interface LogoBrandProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LogoBrand: React.FC<LogoBrandProps> = ({
  className,
  ...props
}) => (
  <span
    role="list"
    className={cx("mr-2", "text-xl", "font-medium", "md:inline", className)}
    {...props}
  />
);

export interface LogoIconProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

export const LogoIcon: React.FC<LogoIconProps> = ({ className, ...props }) => (
  <span className={cx("mr-2", "md:inline", "hidden")}>
    <img className="w-[2.5rem]" alt="" {...props} />
  </span>
);

export interface LogoTitleProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const LogoTitle: React.FC<LogoTitleProps> = ({
  className,
  ...props
}) => (
  <span
    role="list"
    className={cx("text-gray-600", "text-xl", "md:inline", className)}
    {...props}
  />
);

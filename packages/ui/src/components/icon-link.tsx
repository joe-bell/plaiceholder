import React from "react";
import { cx } from "class-variance-authority";

export interface IconLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
}

export const IconLink: React.FC<IconLinkProps> = ({
  className,
  children,
  label,
  ...props
}) => (
  <a
    className={cx(
      "text-gray-500",
      "hover:text-gray-900",
      "transition-colors",
      "duration-200",
      className
    )}
    {...props}
  >
    <span className="sr-only">{label}</span>
    {children}
  </a>
);

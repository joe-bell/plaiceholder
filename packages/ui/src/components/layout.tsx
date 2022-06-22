import React from "react";
import { cva, cx } from "class-variance-authority";

const container = cva(["max-w-5xl", "mx-auto", "px-4", "w-full"]);

export interface LayoutHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const LayoutHeader: React.FC<LayoutHeaderProps> = ({
  className,
  children,
  ...props
}) => (
  <header
    className={cx(
      "bg-white",
      "border-b",
      "border-gray-300",
      "py-4",
      "z-10",
      className
    )}
    {...props}
  >
    <div
      className={container({
        class: ["flex", "justify-between", "items-center"],
      })}
    >
      {children}
    </div>
  </header>
);

export interface LayoutMainProps extends React.HTMLAttributes<HTMLDivElement> {}

export const LayoutMain: React.FC<LayoutMainProps> = ({
  className,
  ...props
}) => (
  <main
    className={container({
      class: ["mt-6", "pb-20", "text-gray-800", className],
    })}
    {...props}
  />
);

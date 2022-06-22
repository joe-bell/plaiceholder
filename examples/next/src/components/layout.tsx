import * as React from "react";
import NextLink from "next/link";
import { cx } from "class-variance-authority";
import {
  Article,
  ArticleHeading,
  ArticleSubheading,
  ArticleContent,
  LayoutHeader,
  LayoutMain,
  IconGitHub,
  IconTwitter,
} from "@plaiceholder/ui";

import { config } from "@/config";
import { Head } from "./head";

export type TLayoutProps =
  | {
      variant: "example";
      title: string;
      heading: string;
    }
  | { variant: "home"; title: string; heading?: null }
  | { variant?: null; title?: null; heading?: null };

const containerClassNames = ["max-w-5xl", "mx-auto", "px-4", "w-full"];

export const Layout: React.FC<TLayoutProps> = ({ children, ...props }) => (
  <React.Fragment>
    <Head />
    <LayoutHeader>
      <NextLink href="/">
        <a className={cx("inline-flex", "items-center", "hover:opacity-75")}>
          <span className="mr-2 text-xl font-medium md:inline">
            plaiceholder
          </span>
          <span className="mr-2 md:inline hidden">
            <img
              className="w-[2.5rem]"
              src={[config.domain, "assets/images/logo/logo@192px.png"].join(
                "/"
              )}
              alt=""
            />
          </span>
          <span className="text-gray-600 text-xl md:inline">Next.js</span>
        </a>
      </NextLink>
      <ul className={cx("flex", "space-x-4")}>
        {[
          {
            icon: <IconGitHub />,
            href: config.social.github,
            label: "View the GitHub repo",
          },
          {
            icon: <IconTwitter />,
            href: config.social.twitter,
            label: "Contact the author on Twitter",
          },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cx(
                "text-gray-500",
                "hover:text-gray-900",
                "transition-colors",
                "duration-200"
              )}
            >
              <span className="sr-only">{item.label}</span>
              {item.icon}
            </a>
          </li>
        ))}
      </ul>
    </LayoutHeader>
    <LayoutMain>
      {props.variant
        ? {
            home: (
              <Article>
                <ArticleHeading size="alpha">{props.title}</ArticleHeading>
                <ArticleSubheading asChild>
                  <p>Choose-your-own adventure</p>
                </ArticleSubheading>
                <ArticleContent>{children}</ArticleContent>
              </Article>
            ),
            example: (
              <React.Fragment>
                <Article>
                  <ArticleHeading size="beta">{props.title}</ArticleHeading>
                  <ArticleSubheading>{props.heading}</ArticleSubheading>
                  <ArticleContent>{children}</ArticleContent>
                </Article>
                <nav className={cx("mt-10", "py-4", "border-t")}>
                  <NextLink href="/">
                    <a
                      className={cx(
                        "inline-flex",
                        "items-center",
                        "text-gray-500",
                        "hover:text-gray-900",
                        "transition-colors",
                        "duration-200"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back to Examples
                    </a>
                  </NextLink>
                </nav>
              </React.Fragment>
            ),
          }[props.variant]
        : children}
    </LayoutMain>
  </React.Fragment>
);

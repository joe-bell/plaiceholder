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
  BackBar,
  BackBarLink,
  Flex,
  IconBack,
  IconLink,
  Logo,
  LogoBrand,
  LogoIcon,
  LogoTitle,
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

export const Layout: React.FC<TLayoutProps> = ({ children, ...props }) => (
  <React.Fragment>
    <Head />
    <LayoutHeader>
      <NextLink href="/" passHref>
        <Logo>
          <LogoBrand>plaiceholder</LogoBrand>
          <LogoIcon
            src={[config.domain, "assets/images/logo/logo@192px.png"].join("/")}
          />
          <LogoTitle>Next.js</LogoTitle>
        </Logo>
      </NextLink>
      <Flex role="list" asChild>
        <ul>
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
              <IconLink href={item.href} label={item.label}>
                {item.icon}
              </IconLink>
            </li>
          ))}
        </ul>
      </Flex>
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
                <BackBar>
                  <NextLink href="/" passHref>
                    <BackBarLink>
                      <IconBack size={4} />
                      Back to Examples
                    </BackBarLink>
                  </NextLink>
                </BackBar>
              </React.Fragment>
            ),
          }[props.variant]
        : children}
    </LayoutMain>
  </React.Fragment>
);

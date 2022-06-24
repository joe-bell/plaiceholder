import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { cx } from "class-variance-authority";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { config } from "~/config";
import {
  IconLink,
  IconGitHub,
  IconTwitter,
  LayoutHeader,
  LayoutMain,
  Logo,
  LogoBrand,
  LogoIcon,
  LogoTitle,
  Flex,
} from "@plaiceholder/ui";

import tailwind from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  {
    rel: "shortcut icon",
    href: [config.domain, "assets/images/favicon/favicon@192px.png"].join("/"),
  },
  {
    rel: "apple-touch-icon",
    href: [config.domain, "assets/images/favicon/favicon@192px.png"].join("/"),
  },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: config.title,
  viewport: "width=device-width,initial-scale=1",
  robots: "noindex",
  description: config.title,
  "og:title": config.title,
  "apple-mobile-web-app-title": config.title,
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <LayoutHeader>
          <Logo asChild>
            <NavLink to="/">
              <LogoBrand>plaiceholder</LogoBrand>
              <LogoIcon
                src={[config.domain, "assets/images/logo/logo@192px.png"].join(
                  "/"
                )}
              />
              <LogoTitle>Remix</LogoTitle>
            </NavLink>
          </Logo>
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
          <Outlet />
        </LayoutMain>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

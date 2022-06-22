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
  IconGitHub,
  IconTwitter,
  LayoutHeader,
  LayoutMain,
} from "@plaiceholder/ui";

import tailwind from "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
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
          <NavLink
            to="/"
            className={cx("inline-flex", "items-center", "hover:opacity-75")}
          >
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
            <span className="text-gray-600 text-xl md:inline">Remix</span>
          </NavLink>
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
          <Outlet />
        </LayoutMain>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

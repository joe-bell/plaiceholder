import * as React from "react";
import { IconGitHub, IconTwitter } from "@/components/icons";
import { cx } from "@/styles";
import { config } from "@/data/config";
import { Head } from "./head";

export const Layout: React.FC = ({ children }) => (
  <React.Fragment>
    <Head />
    <header
      className={cx("bg-white", "border-b", "border-gray-300", "py-4", "z-10")}
    >
      <div
        className={cx(
          "c-container",
          "w-full",
          "flex",
          "justify-end",
          "items-center"
        )}
      >
        <ul className={cx("flex", "space-x-4")}>
          <li>
            <a href={config.social.github} className={cx("c-icon-link")}>
              <span className="sr-only">View the GitHub repo</span>
              <IconGitHub />
            </a>
          </li>
          <li>
            <a href={config.social.twitter} className={cx("c-icon-link")}>
              <span className="sr-only">Contact the author on Twitter</span>
              <IconTwitter />
            </a>
          </li>
        </ul>
      </div>
    </header>
    <main className={cx("c-container", "mt-6", "pb-20", "text-gray-800")}>
      {children}
    </main>
  </React.Fragment>
);

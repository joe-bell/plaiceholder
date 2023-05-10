import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import {
  exampleBody,
  exampleLink,
  exampleList,
  exampleListItem,
  exampleLQIP,
  exampleNav,
  exampleNavItem,
  exampleTitle,
} from "@plaiceholder/ui";

import { config } from "@/config";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const plaiceholders = await Promise.all(
    glob
      .sync("./public/assets/images/unsplash/*.{jpg,png}")
      .map(async (file) => {
        const buffer = await fs.readFile(file);

        const { css } = await getPlaiceholder(buffer);

        return css;
      })
  ).then((values) => values);

  return {
    props: {
      plaiceholders,
      examples: config.examples,
    },
  };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  plaiceholders,
  examples,
}) => (
  <Layout variant="home" title="Next.js">
    <ul role="list" className={exampleList()}>
      {Object.keys(examples.pages).map((example, i) => (
        <li key={example} className={exampleListItem()}>
          <div
            aria-hidden="true"
            className={exampleLQIP()}
            style={plaiceholders[i]}
          />

          <p className={exampleBody()}>
            <span className={exampleTitle()}>
              {config.examples.pages[example].title}
            </span>
          </p>

          <ul role="list" className={exampleNav()}>
            {Object.keys(examples.variants).map((variant) => {
              const href = `/${example}/${variant}`;
              return (
                <li key={variant} className={exampleNavItem()}>
                  <Link href={href}>
                    <a className={exampleLink()}>
                      {examples.variants[variant].title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Index;

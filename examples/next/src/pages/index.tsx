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
import { getAllUnsplashImagePaths } from "@/lib/images";

export const getStaticProps = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const plaiceholders = await Promise.all(
    imagePaths.map(async (src) => {
      const { css } = await getPlaiceholder(src);

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
        <li className={exampleListItem()}>
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
                <li className={exampleNavItem()}>
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

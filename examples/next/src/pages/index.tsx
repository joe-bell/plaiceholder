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
  const getImages = async (pattern: string) =>
    Promise.all(
      glob.sync(pattern).map(async (file) => {
        const src = file.replace("./public", "");
        const buffer = await fs.readFile(file);

        const {
          metadata: { height, width },
          ...plaiceholder
        } = await getPlaiceholder(buffer);

        return { ...plaiceholder, img: { src, height, width } };
      })
    );

  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}")
    // pick essential keys to prevent page bloat
    .then((images) => images.map(({ css }) => ({ css })));

  return {
    props: {
      images,
      examples: config.examples,
    },
  };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
  examples,
}) => (
  <Layout variant="home" title="Next.js">
    <ul role="list" className={exampleList()}>
      {Object.keys(examples.pages).map((example, i) => (
        <li key={example} className={exampleListItem()}>
          <div
            aria-hidden="true"
            className={exampleLQIP()}
            style={images[i].css}
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
                  <Link href={href} className={exampleLink()}>
                    {examples.variants[variant].title}
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

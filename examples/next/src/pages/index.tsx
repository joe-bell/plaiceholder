import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import {
  Example,
  ExampleLink,
  ExampleNav,
  ExampleNavItem,
  ExamplePlaiceholder,
  Examples,
  ExampleTitle,
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
    <Examples>
      {Object.keys(examples.pages).map((example, i) => (
        <Example key={example}>
          <ExamplePlaiceholder plaiceholder={plaiceholders[i]} />
          <ExampleTitle>{examples.pages[example].title}</ExampleTitle>

          <ExampleNav>
            {Object.keys(examples.variants).map((variant) => {
              const href = `/${example}/${variant}`;
              return (
                <ExampleNavItem key={href}>
                  <Link href={href} passHref>
                    <ExampleLink>
                      {examples.variants[variant].title}
                    </ExampleLink>
                  </Link>
                </ExampleNavItem>
              );
            })}
          </ExampleNav>
        </Example>
      ))}
    </Examples>
  </Layout>
);

export default Index;

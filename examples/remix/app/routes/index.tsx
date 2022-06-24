import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import {
  Article,
  ArticleHeading,
  ArticleSubheading,
  ArticleContent,
  Example,
  ExampleLink,
  ExampleNav,
  ExampleNavItem,
  ExamplePlaiceholder,
  Examples,
  ExampleTitle,
} from "@plaiceholder/ui";

import { config } from "~/config";
import type { IGetPlaiceholderReturn } from "~/lib/plaiceholder.server";
import { getPlaiceholder } from "~/lib/plaiceholder.server";
import { getAllUnsplashImagePaths } from "~/lib/images.server";

type LoaderData = {
  examples: typeof config.examples;
  plaiceholders: IGetPlaiceholderReturn["css"][];
};

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const plaiceholders = await Promise.all(
    imagePaths.map(async (src) => {
      const { css } = await getPlaiceholder(src);

      return css;
    })
  ).then((values) => values);

  return json<LoaderData>({ plaiceholders, examples: config.examples });
};

export default function Index() {
  const { examples, plaiceholders } = useLoaderData<LoaderData>();

  return (
    <Article>
      <ArticleHeading size="alpha">Remix</ArticleHeading>
      <ArticleSubheading asChild>
        <p>Choose-your-own adventure</p>
      </ArticleSubheading>
      <ArticleContent>
        <Examples>
          {Object.keys(examples.pages).map((example, i) => (
            <Example key={example}>
              <ExamplePlaiceholder plaiceholder={plaiceholders[i]} />
              <ExampleTitle>
                {
                  examples.pages[example as keyof typeof config.examples.pages]
                    .title
                }
              </ExampleTitle>

              <ExampleNav>
                {Object.keys(examples.variants).map((variant) => {
                  const to = `/${example}/${variant}`;
                  return (
                    <ExampleNavItem key={to}>
                      <ExampleLink asChild>
                        <Link {...{ to }}>
                          {
                            examples.variants[
                              variant as keyof typeof config.examples.variants
                            ].title
                          }
                        </Link>
                      </ExampleLink>
                    </ExampleNavItem>
                  );
                })}
              </ExampleNav>
            </Example>
          ))}
        </Examples>
      </ArticleContent>
    </Article>
  );
}

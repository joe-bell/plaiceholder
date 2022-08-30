import {
  json,
  type HeadersFunction,
  type LoaderFunction,
} from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";
import {
  article,
  articleContent,
  articleHeader,
  articleHeaderSubtitle,
  articleHeaderTitle,
  exampleBody,
  exampleLink,
  exampleList,
  exampleListItem,
  exampleLQIP,
  exampleNav,
  exampleNavItem,
  exampleTitle,
} from "@plaiceholder/ui";

import { config } from "~/config";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";

type LoaderData = {
  examples: typeof config.examples;
  plaiceholders: IGetPlaiceholderReturn["css"][];
};

export const headers: HeadersFunction = () => ({
  "Cache-Control": config["Cache-Control"],
});

export const loader: LoaderFunction = async () => {
  const plaiceholders = await Promise.all(
    config.examples.variants.multiple.unsplash.map(async (src) => {
      const { css } = await getPlaiceholder(src);

      return css;
    })
  ).then((values) => values);

  return json<LoaderData>({ plaiceholders, examples: config.examples });
};

export default function Index() {
  const { examples, plaiceholders } = useLoaderData<LoaderData>();

  return (
    <article className={article()}>
      <header className={articleHeader()}>
        <h1 className={articleHeaderTitle({ size: "alpha" })}>Remix</h1>
        <p className={articleHeaderSubtitle()}>Choose-your-own adventure</p>
      </header>
      <div className={articleContent()}>
        <ul className={exampleList()}>
          {Object.keys(examples.pages).map((example, i) => (
            <li key={example} className={exampleListItem()}>
              <div
                aria-hidden="true"
                className={exampleLQIP()}
                style={plaiceholders[i]}
              />

              <p className={exampleBody()}>
                <span className={exampleTitle()}>
                  {
                    examples.pages[
                      example as keyof typeof config.examples.pages
                    ].title
                  }
                </span>
              </p>

              <ul className={exampleNav()}>
                {Object.keys(examples.variants).map((variant) => {
                  const to = `/${example}/${variant}`;
                  return (
                    <li key={to} className={exampleNavItem()}>
                      <Link {...{ to }} className={exampleLink()}>
                        {
                          examples.variants[
                            variant as keyof typeof config.examples.variants
                          ].title
                        }
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

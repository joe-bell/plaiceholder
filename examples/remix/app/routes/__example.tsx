import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Outlet, Link } from "@remix-run/react";
import invariant from "tiny-invariant";
import {
  Article,
  ArticleHeading,
  ArticleSubheading,
  IconBack,
  BackBar,
  BackBarLink,
} from "@plaiceholder/ui";

import { config } from "~/config";

type LoaderData = {
  title: string;
  subheading: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { pathname } = new URL(request.url);
  const path = pathname.split("/");

  invariant(path.length === 3, "Expected a pathname two-levels deep");

  const [, page, variant] = pathname.split("/");

  const disjunction = new Intl.ListFormat("en", {
    style: "short",
    type: "disjunction",
  });
  invariant(
    config.examples.pages.hasOwnProperty(page),
    `Expected keyof config.examples.pages: ${disjunction.format(
      Object.keys(config.examples.pages)
    )}`
  );
  invariant(
    config.examples.variants.hasOwnProperty(variant),
    `Expected keyof config.examples.variants: ${disjunction.format(
      Object.keys(config.examples.variants)
    )}`
  );

  return json<LoaderData>({
    title:
      config.examples.pages[page as keyof typeof config.examples.pages].title,
    subheading:
      config.examples.variants[variant as keyof typeof config.examples.variants]
        .title,
  });
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => ({
  title: `${data.title}: ${data.subheading} | ${config.title}`,
});

export default function Example() {
  const { title, subheading } = useLoaderData<LoaderData>();

  return (
    <Article>
      <ArticleHeading size="beta">{title}</ArticleHeading>
      <ArticleSubheading>{subheading}</ArticleSubheading>
      <Outlet />
      <BackBar>
        <BackBarLink asChild>
          <Link to="/">
            <IconBack size={4} />
            Back to Examples
          </Link>
        </BackBarLink>
      </BackBar>
    </Article>
  );
}

import fs from "node:fs/promises";
import glob from "glob";
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
import Article from "@/components/article";

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

export default async function Page() {
  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}");

  return (
    <Article
      title="Next.js"
      subtitle="Choose-your-own adventure"
      variant="home"
    >
      <ul role="list" className={exampleList()}>
        {Object.keys(config.examples.pages).map((example, i) => (
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
              {Object.keys(config.examples.variants).map((variant) => {
                const href = `/${example}/${variant}`;
                return (
                  <li key={variant} className={exampleNavItem()}>
                    <Link href={href} className={exampleLink()}>
                      {config.examples.variants[variant].title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </Article>
  );
}

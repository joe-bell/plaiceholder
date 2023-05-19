import fs from "node:fs/promises";
import path from "node:path";
import * as React from "react";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import {
  article,
  articleContent,
  articleHeader,
  articleHeaderSubtitle,
  articleHeaderTitle,
  imageList,
  imageListItem,
} from "@plaiceholder/ui";
import { config } from "@/config";
import Article from "@/components/article";

const getImage = async (plaiceholder: string) => {
  const src = extractImgSrc(plaiceholder);
  const buffer = await fs.readFile(path.join("./public", src));

  const {
    metadata: { height, width },
  } = await getPlaiceholder(buffer);

  return { plaiceholder, img: { src, height, width } };
};

export default async function Page() {
  const { plaiceholder, img } = await getImage(
    "plaiceholder-[/assets/images/keila-joa@578.jpg]"
  );

  return (
    <Article
      title={config.examples.pages.tailwind.title}
      subtitle={config.examples.variants.single.title}
      variant="example"
    >
      <ul role="list" className={imageList({ columns: 2 })}>
        <li key={plaiceholder} className={imageListItem()}>
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              plaiceholder,
              "transform",
              "scale-150",
              "filter",
              "blur-2xl",
              "z-[-1]"
            )}
          />
          <Image
            {...img}
            alt="Looking down Keila river, Estonia"
            title="Photo by Joe Bell"
          />
        </li>
      </ul>
    </Article>
  );
}

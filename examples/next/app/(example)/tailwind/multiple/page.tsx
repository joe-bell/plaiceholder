import fs from "node:fs/promises";
import path from "node:path";
import * as React from "react";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import Article from "@/components/article";

const getImages = (...classNames: string[]) =>
  Promise.all(
    classNames.map(async (plaiceholder) => {
      const src = extractImgSrc(plaiceholder);
      const buffer = await fs.readFile(path.join("./public", src));

      const {
        metadata: { height, width },
      } = await getPlaiceholder(buffer);

      return { plaiceholder, img: { src, height, width } };
    })
  );

export default async function Page() {
  const images = await getImages(
    "plaiceholder-[/assets/images/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
    "plaiceholder-[/assets/images/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-tek55norwaQ.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-WX1siNmyR4.jpg]"
  );

  return (
    <Article
      title={config.examples.pages.tailwind.title}
      subtitle={config.examples.variants.multiple.title}
      variant="example"
    >
      <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
        {images.map(({ plaiceholder, img }) => (
          <li key={img.src} className={imageListItem()}>
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
            <Image {...img} alt="Paint Splashes" title="Photo from Unsplash" />
          </li>
        ))}
      </ul>
    </Article>
  );
}

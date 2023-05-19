import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
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
      title={config.examples.pages.color.title}
      subtitle={config.examples.variants.multiple.title}
      variant="example"
    >
      <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
        {images.map(({ color, img }) => (
          <li key={img.src} className={imageListItem()}>
            <div
              className={cx(
                "absolute",
                "inset-0",
                "w-full",
                "h-full",
                "transform",
                "scale-150",
                "filter",
                "blur-2xl",
                "z-[-1]"
              )}
              style={{ backgroundColor: color.hex }}
            />

            <Image {...img} alt="Paint Splashes" title="Photo from Unsplash" />
          </li>
        ))}
      </ul>
    </Article>
  );
}

import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import Article from "@/components/article";

const getImages = async (pattern: string) =>
  Promise.all(
    glob.sync(pattern).map(async (file) => {
      const src = file.replace("./public", "");
      const buffer = await fs.readFile(file);

      const plaiceholder = await getPlaiceholder(buffer);

      return { ...plaiceholder, img: { src } };
    })
  );

export default async function Page() {
  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}");

  return (
    <Article
      title={config.examples.pages.base64.title}
      subtitle={config.examples.variants.multiple.title}
      variant="example"
    >
      <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
        {images.map(({ base64, img }) => (
          <li key={img.src} className={imageListItem()}>
            <Image
              {...img}
              alt="Paint Splashes"
              title="Photo from Unsplash"
              blurDataURL={base64}
              placeholder="blur"
              fill
            />
          </li>
        ))}
      </ul>
    </Article>
  );
}

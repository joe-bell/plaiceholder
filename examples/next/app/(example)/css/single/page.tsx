import * as React from "react";
import Image from "next/image";
import { cx } from "class-variance-authority";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import Article from "@/components/article";

const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

export default async function Page() {
  const { css, img } = await getImage(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80"
  );

  return (
    <Article
      title={config.examples.pages.css.title}
      subtitle={config.examples.variants.single.title}
      variant="example"
    >
      <ul role="list" className={imageList({ columns: 2 })}>
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
            style={css}
          />
          <Image
            {...img}
            alt="Snowy mountain peaks"
            title="Photo from Unsplash"
          />
        </li>
      </ul>
    </Article>
  );
}

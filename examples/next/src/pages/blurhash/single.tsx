import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { BlurhashCanvas } from "react-blurhash";
import { config } from "@/config";
import { cx } from "class-variance-authority";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const src =
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80";

  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { blurhash, img } = await getPlaiceholder(buffer, { size: 16 });

  return {
    props: {
      img: {
        ...img,
        src,
        alt: "Snowy mountain peaks",
        title: "Photo from Unsplash",
      },
      blurhash,
      title: config.examples.pages.blurhash.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBlurhashSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, blurhash }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 2 })}>
      <li key={img.src} className={imageListItem()}>
        <BlurhashCanvas
          hash={blurhash.hash}
          width={blurhash.height}
          height={blurhash.width}
          punch={1}
          className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
        />
        <Image {...img} />
      </li>
    </ul>
  </Layout>
);

export default PageBlurhashSingle;

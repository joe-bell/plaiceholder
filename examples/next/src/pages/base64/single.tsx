import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const src =
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80";

  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { base64, img } = await getPlaiceholder(buffer, { size: 10 });

  return {
    props: {
      img: {
        ...img,
        src,
        blurDataURL: base64,
        alt: "Snowy mountain peaks",
        title: "Photo from Unsplash",
      },
      title: config.examples.pages.base64.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBase64Single: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 2 })}>
      <li key={img.src} className={imageListItem()}>
        <Image {...img} placeholder="blur" />
      </li>
    </ul>
  </Layout>
);

export default PageBase64Single;

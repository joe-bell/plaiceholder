import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const getImages = async (pattern: string) =>
    Promise.all(
      glob.sync(pattern).map(async (file) => {
        const src = file.replace("./public", "");
        const buffer = await fs.readFile(file);

        const {
          // Stubbing out `img` as we don't need dimensions when using
          // `next/image` with the `fill` prop
          img,
          ...plaiceholder
        } = await getPlaiceholder(buffer);

        return { ...plaiceholder, img: { src } };
      })
    );

  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}");

  return {
    props: {
      images,
      title: config.examples.pages.base64.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageBase64Multiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
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
  </Layout>
);

export default PageBase64Multiple;

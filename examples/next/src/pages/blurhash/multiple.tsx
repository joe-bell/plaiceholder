import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { BlurhashCanvas } from "react-blurhash";
import { Layout } from "@/components/layout";
import { config } from "@/config";
import { cx } from "class-variance-authority";

export const getStaticProps = async () => {
  const getImages = async (pattern: string) =>
    Promise.all(
      glob.sync(pattern).map(async (file) => {
        const src = file.replace("./public", "");
        const buffer = await fs.readFile(file);

        const { img, ...plaiceholder } = await getPlaiceholder(buffer);

        return { ...plaiceholder, img: { ...img, src } };
      })
    );

  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}");

  return {
    props: {
      images,
      title: config.examples.pages.blurhash.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageBlurhashMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ blurhash, img }) => (
        <li key={img.src} className={imageListItem()}>
          <BlurhashCanvas
            hash={blurhash.hash}
            width={blurhash.height}
            height={blurhash.width}
            punch={1}
            className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
          />

          <Image {...img} alt="Paint Splashes" title="Photo from Unsplash" />
        </li>
      ))}
    </ul>
  </Layout>
);

export default PageBlurhashMultiple;

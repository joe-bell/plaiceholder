import fs from "node:fs/promises";
import glob from "glob";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { cx } from "class-variance-authority";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
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

  const images = await getImages("./public/assets/images/unsplash/*.{jpg,png}")
    // pick essential keys to prevent page bloat
    .then((images) => images.map(({ css, img }) => ({ css, img })));

  return {
    props: {
      images,
      title: config.examples.pages.css.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageCSSMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ css, img }) => (
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

          <Image {...img} alt="Paint Splashes" title="Photo from Unsplash" />
        </li>
      ))}
    </ul>
  </Layout>
);

export default PageCSSMultiple;

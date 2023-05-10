import fs from "node:fs/promises";
import path from "node:path";
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/future/image";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { imageList, imageListItem } from "@plaiceholder/ui";
import { config } from "@/config";
import { Layout } from "@/components/layout";
import { cx } from "class-variance-authority";

export const getStaticProps = async () => {
  const getImages = (...classNames: string[]) =>
    Promise.all(
      classNames.map(async (className) => {
        const src = extractImgSrc(className);
        const buffer = await fs.readFile(path.join("./public", src));

        const { img } = await getPlaiceholder(buffer);

        return { ...img, className, src };
      })
    );

  const images = await getImages(
    "plaiceholder-[/assets/images/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
    "plaiceholder-[/assets/images/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-tek55norwaQ.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-WX1siNmyR4.jpg]"
  );

  return {
    props: {
      images,
      title: config.examples.pages.tailwind.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageTailwindMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ images, title, heading }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ul role="list" className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ className, ...image }) => (
        <li key={image.src} className={imageListItem()}>
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              className,
              "transform",
              "scale-150",
              "filter",
              "blur-2xl",
              "z-[-1]"
            )}
          />
          <Image {...image} alt="Paint Splashes" title="Photo from Unsplash" />
        </li>
      ))}
    </ul>
  </Layout>
);

export default PageTailwindMultiple;

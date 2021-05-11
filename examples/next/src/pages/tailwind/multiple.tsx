import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { extractImagePath } from "@plaiceholder/tailwindcss/utils";
import { config } from "@/config";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";

const getImagesFromPlaiceholders = (...plaiceholders) =>
  Promise.all(
    plaiceholders.map(async (plaiceholder) => {
      const src = extractImagePath(plaiceholder);
      const { width, height } = await getImage(src);

      return { plaiceholder, src, width, height };
    })
  );

export const getStaticProps = async () => {
  const images = await getImagesFromPlaiceholders(
    "plaiceholder-[/assets/image/alexander-ant-oR7HxvOe2YE-unsplash.jpg]",
    "plaiceholder-[/assets/image/alexander-ant-r7xdS9hjYYE-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-0KXl7T2YU0I-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-ju3ZBdiXzmA-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-tek55norwaQ-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-WX1siNmy_R4-unsplash.jpg]"
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
    <ImageGrid>
      {images.map(({ plaiceholder, ...image }) => (
        <ImageGridItem key={plaiceholder}>
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
              "blur-xl"
            )}
          />
          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageTailwindMultiple;

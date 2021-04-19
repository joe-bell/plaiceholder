import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/get";
import { getPixelsCSS } from "@plaiceholder/css";
import { config } from "@/config";
import { getAllPublicImagePaths } from "@/lib/images";
import { cx } from "@/styles";
import { Layout } from "@/components/layout";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async ({ params }) => {
  const imagePaths = getAllPublicImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { buffer, ...details } = await getImage(src);
      const pixelsCSS = await getPixelsCSS(buffer);

      return {
        src,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        ...details,
        pixelsCSS,
      };
    })
  ).then((values) => values);

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
    <ImageGrid>
      {images.map(({ pixelsCSS, ...image }) => (
        <ImageGridItem key={image.src}>
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "transform",
              "scale-150",
              "filter",
              "blur-xl"
            )}
            style={{
              filter: "blur(24px)",
              transform: "scale(1.2)",
              ...pixelsCSS,
            }}
          />

          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageCSSMultiple;

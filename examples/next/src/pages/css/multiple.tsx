import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { getAllUnsplashImagePaths } from "@/lib/images";
import { cx } from "@/styles";
import { Layout } from "@/components/layout";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { css, img } = await getPlaiceholder(src, { size: 4 });

      return {
        ...img,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        css,
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
      {images.map(({ css, ...image }) => (
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
              "blur-2xl"
            )}
            style={css}
          />

          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageCSSMultiple;

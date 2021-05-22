import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { getPixelsCSS } from "plaiceholder";
import { config } from "@/config";
import { cx } from "@/styles";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const src = "/keila-joa@578.jpg";

  const { buffer, ...details } = await getImage(src);
  const pixelsCSS = await getPixelsCSS(buffer);

  return {
    props: {
      image: {
        src,
        ...details,
      },
      pixelsCSS,
      title: config.examples.pages.css.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageCSSSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, image, pixelsCSS }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
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
    </ImageGrid>
  </Layout>
);

export default PageCSSSingle;

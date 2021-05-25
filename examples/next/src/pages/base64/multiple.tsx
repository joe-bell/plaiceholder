import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { cx } from "@/styles";
import { config } from "@/config";
import { getAllPublicImagePaths } from "@/lib/images";
import { Layout } from "@/components/layout";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async ({ params }) => {
  const imagePaths = getAllPublicImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src);

      return {
        ...img,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        base64,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
      title: config.examples.pages.base64.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageSVGMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid>
      {images.map(({ base64, ...image }) => (
        <ImageGridItem key={image.src}>
          <img
            aria-hidden="true"
            alt=""
            src={base64}
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "object-cover",
              "object-center"
            )}
            style={{ filter: "blur(24px)", transform: "scale(1.2)" }}
          />

          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageSVGMultiple;

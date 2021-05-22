import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { getPixelsSVG } from "plaiceholder";
import { config } from "@/config";
import { Layout } from "@/components/layout";
import { getAllPublicImagePaths } from "@/lib/images";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async ({ params }) => {
  const imagePaths = getAllPublicImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { buffer, ...details } = await getImage(src);
      const pixelsSVG = await getPixelsSVG(buffer);

      return {
        src,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        ...details,
        pixelsSVG,
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
      placeholderStyle: { filter: "blur(24px)", transform: "scale(1.2)" },
      title: config.examples.pages.svg.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageSVGMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images, placeholderStyle }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid>
      {images.map(({ pixelsSVG, ...image }) => (
        <ImageGridItem key={image.src}>
          {React.createElement(
            pixelsSVG[0],
            {
              ...pixelsSVG[1],
              style: {
                ...placeholderStyle,
                ...pixelsSVG[1].style,
                transform: `${placeholderStyle.transform} ${pixelsSVG[1].style.transform}`,
                filter: placeholderStyle.filter,
              },
            },
            pixelsSVG[2].map((child) =>
              React.createElement(child[0], {
                key: [child[1].x, child[1].y].join(","),
                ...child[1],
              })
            )
          )}
          <Image {...image} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  </Layout>
);

export default PageSVGMultiple;

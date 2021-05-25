import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { Layout } from "@/components/layout";
import { getAllPublicImagePaths } from "@/lib/images";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async () => {
  const imagePaths = getAllPublicImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { svg, img } = await getPlaiceholder(src);

      return {
        ...img,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        svg,
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
      {images.map(({ svg, ...image }) => (
        <ImageGridItem key={image.src}>
          {React.createElement(
            svg[0],
            {
              ...svg[1],
              style: {
                ...placeholderStyle,
                ...svg[1].style,
                transform: `${placeholderStyle.transform} ${svg[1].style.transform}`,
                filter: placeholderStyle.filter,
              },
            },
            svg[2].map((child) =>
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

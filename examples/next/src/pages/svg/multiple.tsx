import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { Layout } from "@/components/layout";
import { getAllUnsplashImagePaths } from "@/lib/images";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";

export const getStaticProps = async () => {
  const imagePaths = getAllUnsplashImagePaths();

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
      title: config.examples.pages.svg.title,
      heading: config.examples.variants.multiple.title,
    },
  };
};

const PageSVGMultiple: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, images }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid>
      {images.map(({ svg, ...image }) => (
        <ImageGridItem key={image.src}>
          {React.createElement(
            svg[0],
            {
              ...svg[1],
              style: {
                ...svg[1].style,
                transform: ["scale(1.5)", svg[1].style.transform].join(" "),
                filter: "blur(40px)",
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

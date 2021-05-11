import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { getPixelsSVG } from "@plaiceholder/svg";
import { config } from "@/config";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const src = "/keila-joa@578.jpg";

  const { buffer, ...details } = await getImage(src);
  const pixelsSVG = await getPixelsSVG(buffer);

  return {
    props: {
      image: {
        src,
        ...details,
      },
      pixelsSVG,
      placeholderStyle: { filter: "blur(24px)", transform: "scale(1.2)" },
      title: config.examples.pages.svg.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageSVGSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, placeholderStyle, image, pixelsSVG }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
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
    </ImageGrid>
  </Layout>
);

export default PageSVGSingle;

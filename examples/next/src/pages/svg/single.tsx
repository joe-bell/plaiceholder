import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const { svg, img } = await getPlaiceholder("/keila-joa@578.jpg");

  return {
    props: {
      img,
      svg,
      placeholderStyle: { filter: "blur(24px)", transform: "scale(1.2)" },
      title: config.examples.pages.svg.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageSVGSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, placeholderStyle, img, svg }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={img.src}>
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
        <Image {...img} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageSVGSingle;

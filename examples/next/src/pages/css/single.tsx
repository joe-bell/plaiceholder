import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { cx } from "@/styles";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const { css, img } = await getPlaiceholder("/keila-joa@578.jpg");

  return {
    props: {
      img,
      css,
      title: config.examples.pages.css.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageCSSSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, css }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={img.src}>
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
          style={{
            ...css,
          }}
        />

        <Image {...img} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageCSSSingle;

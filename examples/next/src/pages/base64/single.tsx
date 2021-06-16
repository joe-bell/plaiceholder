import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
    { size: 10 }
  );

  return {
    props: {
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
      title: config.examples.pages.base64.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBase64Single: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, imageProps }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={imageProps.src}>
        <Image {...imageProps} placeholder="blur" />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageBase64Single;

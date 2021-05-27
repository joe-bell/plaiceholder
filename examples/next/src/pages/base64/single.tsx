import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { config } from "@/config";
import { cx } from "@/styles";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80"
  );

  return {
    props: {
      img,
      base64,
      title: config.examples.pages.base64.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBase64Single: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, base64 }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={img.src}>
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
            "object-center",
            "transform",
            "scale-150",
            "filter",
            "blur-2xl"
          )}
        />
        <Image {...img} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageBase64Single;

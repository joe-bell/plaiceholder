import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getBase64, getImage } from "plaiceholder";
import { config } from "@/config";
import { cx } from "@/styles";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const src = "/keila-joa@578.jpg";

  const { buffer, ...details } = await getImage(src);
  const base64 = await getBase64(buffer);

  return {
    props: {
      image: {
        src,
        ...details,
      },
      base64,
      title: config.examples.pages.base64.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBase64Single: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, image, base64 }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
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
    </ImageGrid>
  </Layout>
);

export default PageBase64Single;

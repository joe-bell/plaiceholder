import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { BlurhashCanvas } from "react-blurhash";
import { config } from "@/config";
import { cx } from "@/styles";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const { blurhash, img } = await getPlaiceholder("/keila-joa@578.jpg");

  return {
    props: {
      img,
      blurhash,
      title: config.examples.pages.blurhash.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBlurhashSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, blurhash }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={img.src}>
        <BlurhashCanvas
          hash={blurhash.hash}
          width={blurhash.height}
          height={blurhash.width}
          punch={1}
          className={cx("absolute", "inset-0", "w-full", "h-full")}
        />
        <Image {...img} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageBlurhashSingle;

import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { getBlurhash } from "plaiceholder";
import { BlurhashCanvas } from "react-blurhash";
import { config } from "@/config";
import { cx } from "@/styles";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";

export const getStaticProps = async () => {
  const src = "/keila-joa@578.jpg";

  const { buffer, ...details } = await getImage(src);
  const blurhash = await getBlurhash(buffer);

  return {
    props: {
      image: {
        src,
        ...details,
      },
      blurhash,
      title: config.examples.pages.blurhash.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageBlurhashSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, image, blurhash }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={image.src}>
        <BlurhashCanvas
          hash={blurhash.hash}
          width={blurhash.height}
          height={blurhash.width}
          punch={1}
          className={cx("absolute", "inset-0", "w-full", "h-full")}
        />
        <Image {...image} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageBlurhashSingle;

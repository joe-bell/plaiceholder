import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { extractImagePath } from "@plaiceholder/tailwindcss/utils";
import { config } from "@/config";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";

export const getStaticProps = async () => {
  const plaiceholder = "plaiceholder-[/keila-joa@578.jpg]";

  const src = extractImagePath(plaiceholder);
  const { width, height } = await getImage(src);

  return {
    props: {
      image: {
        src,
        width,
        height,
      },
      plaiceholder,
      title: config.examples.pages.tailwind.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageTailwindSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, image, plaiceholder }) => (
  <Layout variant="example" title={title} heading={heading}>
    <ImageGrid columns={2}>
      <ImageGridItem key={plaiceholder}>
        <div
          className={cx(
            "absolute",
            "inset-0",
            "w-full",
            "h-full",
            plaiceholder,
            "transform",
            "scale-150",
            "filter",
            "blur-xl"
          )}
        />
        <Image {...image} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageTailwindSingle;

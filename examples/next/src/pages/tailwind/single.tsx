import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { config } from "@/config";
import { ImageGrid, ImageGridItem } from "@/components/image-grid";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";

export const getStaticProps = async () => {
  const plaiceholder = "plaiceholder-[/assets/keila-joa@578.jpg]";
  const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));

  return {
    props: {
      img,
      plaiceholder,
      title: config.examples.pages.tailwind.title,
      heading: config.examples.variants.single.title,
    },
  };
};

const PageTailwindSingle: React.FC<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ title, heading, img, plaiceholder }) => (
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
            "blur-2xl"
          )}
        />
        <Image {...img} />
      </ImageGridItem>
    </ImageGrid>
  </Layout>
);

export default PageTailwindSingle;

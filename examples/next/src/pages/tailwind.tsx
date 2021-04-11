import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";

import { getImage } from "@plaiceholder/next";
import sizeOf from "image-size";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";

const getImagesFromPlaiceholders = (...plaiceholders) =>
  Promise.all(
    plaiceholders.map(async (plaiceholder) => {
      const src = plaiceholder.replace("plaiceholder-[", "").replace("]", "");
      const img = await getImage(src);
      const { width, height } = sizeOf(img);
      return { plaiceholder, src, width, height };
    })
  );

export const getStaticProps = async () => {
  const images = await getImagesFromPlaiceholders(
    "plaiceholder-[/assets/image/alexander-ant-oR7HxvOe2YE-unsplash.jpg]",
    "plaiceholder-[/assets/image/alexander-ant-r7xdS9hjYYE-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-0KXl7T2YU0I-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-ju3ZBdiXzmA-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-tek55norwaQ-unsplash.jpg]",
    "plaiceholder-[/assets/image/solen-feyissa-WX1siNmy_R4-unsplash.jpg]"
  );

  return {
    props: {
      images,
    },
  };
};

const Example: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  images,
}) => {
  return (
    <Layout>
      <h1 className={cx("font-bold", "text-3xl", "mt-8")}>Tailwind</h1>

      <div
        className={cx(
          "grid",
          "grid-cols-1",
          "sm:grid-cols-2",
          "md:grid-cols-3",
          "gap-4",
          "mt-8"
        )}
      >
        {images.map(({ plaiceholder, ...image }) => (
          <div
            key={image.src}
            className={cx(
              "relative",
              "block",
              "overflow-hidden",
              // See src/styles/index.css
              "next-image"
            )}
          >
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
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Example;

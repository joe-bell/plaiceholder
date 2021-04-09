import * as React from "react";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getImage } from "@plaiceholder/next";
import { getBase64 } from "@plaiceholder/base64";
import { getPixelsCSS } from "@plaiceholder/css";
import { getPixelsSVG } from "@plaiceholder/svg";
import { getBlurhash } from "@plaiceholder/blurhash";
import sizeOf from "image-size";
import { BlurhashCanvas } from "react-blurhash";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";
import { config } from "@/data/config";
import { getAllPublicImagePaths } from "@/lib/images";

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: config.examples.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps = async ({ params }) => {
  const imagePaths = getAllPublicImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const image = await getImage(src);

      const { width, height } = sizeOf(image);

      const base64 = await getBase64(image);
      const blurhash = await getBlurhash(image);
      const pixelsCSS = await getPixelsCSS(image);
      const pixelsSVG = await getPixelsSVG(image);

      return {
        src,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        width,
        height,
        placeholder: {
          base64,
          blurhash,
          pixelsCSS,
          pixelsSVG,
        },
      };
    })
  ).then((values) => values);

  return {
    props: {
      images,
      placeholderStyle: { filter: "blur(24px)", transform: "scale(1.2)" },
      title: config.examples.find((example) => example.slug === params.slug)
        .title,
    },
  };
};

const Example: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  title,
  images,
  placeholderStyle,
}) => {
  const router = useRouter();
  const slug = (router.query
    .slug as unknown) as typeof config.examples[number]["slug"];

  return (
    <Layout>
      <h1 className={cx("font-bold", "text-3xl", "mt-8")}>{title}</h1>

      <h2 className={cx("font-light", "text-gray-600", "text-2xl", "mt-2")}>
        Multiple Images
      </h2>

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
        {images.map(({ placeholder, ...image }) => (
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
            {
              {
                "with-base64": (
                  <img
                    aria-hidden="true"
                    alt=""
                    src={placeholder.base64}
                    className={cx(
                      "absolute",
                      "inset-0",
                      "w-full",
                      "h-full",
                      "object-cover",
                      "object-center"
                    )}
                    style={placeholderStyle}
                  />
                ),
                "with-blurhash": (
                  <BlurhashCanvas
                    hash={placeholder.blurhash.hash}
                    width={placeholder.blurhash.height}
                    height={placeholder.blurhash.width}
                    punch={1}
                    className={cx("absolute", "inset-0", "w-full", "h-full")}
                  />
                ),
                "with-pixels-css": (
                  <div
                    className={cx("absolute", "inset-0", "w-full", "h-full")}
                    style={{
                      ...placeholderStyle,
                      ...placeholder.pixelsCSS,
                    }}
                  />
                ),
                "with-pixels-svg": React.createElement(
                  placeholder.pixelsSVG[0],
                  {
                    ...placeholder.pixelsSVG[1],
                    style: {
                      ...placeholderStyle,
                      ...placeholder.pixelsSVG[1].style,
                      transform: `${placeholderStyle.transform} ${placeholder.pixelsSVG[1].style.transform}`,
                      filter: placeholderStyle.filter,
                    },
                  },
                  placeholder.pixelsSVG[2].map((child) =>
                    React.createElement(child[0], {
                      key: [child[1].x, child[1].y].join(","),
                      ...child[1],
                    })
                  )
                ),
              }[slug]
            }

            <Image {...image} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Example;

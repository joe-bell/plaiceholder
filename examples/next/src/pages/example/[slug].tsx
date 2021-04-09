import * as React from "react";
import { GetStaticPaths, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { getImage } from "@plaiceholder/next";
import { getBase64 } from "@plaiceholder/base64";
import { getPixelsCSS } from "@plaiceholder/css";
import { getPixelsSVG } from "@plaiceholder/svg";
import { getBlurhash } from "@plaiceholder/blurhash";
import { BlurhashCanvas } from "react-blurhash";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";
import { config } from "@/data/config";
import Link from "next/link";
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
      const base64 = await getBase64(image);
      const blurhash = await getBlurhash(image);
      const pixelsCSS = await getPixelsCSS(image);
      const pixelsSVG = await getPixelsSVG(image);

      return {
        src,
        alt: "",
        title: "",
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
      <Link href="/" replace>
        <a
          className={cx(
            "rounded-md",
            "border",
            "border-gray-300",
            "px-4",
            "py-2",
            "bg-white",
            "text-sm",
            "leading-5",
            "font-medium",
            "text-gray-700",
            "hover:bg-gray-100",
            "focus:outline-none",
            "focus:shadow-outline-blue",
            "active:bg-gray-50",
            "active:text-gray-800",
            "transition",
            "ease-in-out",
            "duration-150"
          )}
        >
          ⃪ Back to Examples
        </a>
      </Link>

      <h1 className={cx("font-bold", "text-2xl", "mt-4")}>{title}</h1>

      <div className={cx("grid", "grid-cols-3", "h-screen", "gap-4", "mt-4")}>
        {images.map((image) => (
          <div
            key={image.src}
            className={cx("relative", "block", "overflow-hidden")}
          >
            {
              {
                "with-base64": (
                  <img
                    aria-hidden="true"
                    alt=""
                    src={image.placeholder.base64}
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
                    hash={image.placeholder.blurhash.hash}
                    width={image.placeholder.blurhash.height}
                    height={image.placeholder.blurhash.width}
                    punch={1}
                    className={cx("absolute", "inset-0", "w-full", "h-full")}
                  />
                ),
                "with-pixels-css": (
                  <div
                    className={cx("absolute", "inset-0", "w-full", "h-full")}
                    style={{
                      ...placeholderStyle,
                      ...image.placeholder.pixelsCSS,
                    }}
                  />
                ),
                "with-pixels-svg": React.createElement(
                  image.placeholder.pixelsSVG[0],
                  {
                    ...image.placeholder.pixelsSVG[1],
                    style: {
                      ...placeholderStyle,
                      ...image.placeholder.pixelsSVG[1].style,
                      transform: `${placeholderStyle.transform} ${image.placeholder.pixelsSVG[1].style.transform}`,
                      filter: placeholderStyle.filter,
                    },
                  },
                  image.placeholder.pixelsSVG[2].map((child) =>
                    React.createElement(child[0], {
                      key: [child[1].x, child[1].y].join(","),
                      ...child[1],
                    })
                  )
                ),
              }[slug]
            }

            <Image
              alt={image.alt}
              title={image.title}
              src={image.src}
              layout="fill"
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Example;

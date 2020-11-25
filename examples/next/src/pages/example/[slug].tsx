import * as React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";
import { getImage } from "@plaiceholder/next";
import { getBase64, Base64 } from "@plaiceholder/base64";
import { getPixelsCSS, PixelsCSS } from "@plaiceholder/css";
import { getPixelsSVG, PixelsSVG } from "@plaiceholder/svg";
import { getBlurhash, Blurhash } from "@plaiceholder/blurhash";
import { BlurhashCanvas } from "react-blurhash";
import { Layout } from "@/components/layout";
import { cx } from "@/styles";
import { config } from "@/data/config";
import Link from "next/link";

type ExamplePageProps = {
  title: string;
  img: Record<"alt" | "href" | "title" | "src", string>;
  placeholderBase64?: Base64;
  placeholderBlurhash?: Blurhash;
  placeholderPixelsCSS?: PixelsCSS;
  placeholderPixelsSVG?: PixelsSVG;
  placeholder: {
    style: { [key: string]: string };
  };
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: config.examples.map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<ExamplePageProps> = async ({
  params,
}) => {
  const img = {
    src: "/keila-joa@578.jpg",
    alt: "Keila Joa, Estonia.",
    href: config.social.twitter,
    title: "© Joe Bell",
  };

  const imgFile = await getImage(img.src);

  const placeholderBase64 = await getBase64(imgFile);
  const placeholderBlurhash = await getBlurhash(imgFile);
  const placeholderPixelsCSS = await getPixelsCSS(imgFile);
  const placeholderPixelsSVG = await getPixelsSVG(imgFile);

  return {
    props: {
      img,
      placeholder: {
        style: { filter: "blur(24px)", transform: "scale(1.2)" },
      },
      ...config.examples.reduce(
        (acc, cv) =>
          Object.assign({}, acc, {
            [cv.slug]: {
              ...cv,
              ...{
                "with-pixels-css": {
                  placeholderPixelsCSS,
                },
                "with-pixels-svg": {
                  placeholderPixelsSVG,
                },
                "with-base64": {
                  placeholderBase64,
                },
                "with-blurhash": {
                  placeholderBlurhash,
                },
              }[cv.slug],
            },
          }),
        {}
      )[typeof params.slug === "string" && params.slug],
    },
  };
};

const Example: React.FC<ExamplePageProps> = ({
  img,
  placeholder,
  placeholderBase64,
  placeholderBlurhash,
  placeholderPixelsCSS,
  placeholderPixelsSVG,
  title,
}) => (
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

    <a
      className={cx("relative", "block", "overflow-hidden", "mt-4", "max-w-lg")}
      href={img.href}
    >
      {placeholderBase64 && (
        <img
          aria-hidden="true"
          alt=""
          src={placeholderBase64}
          className={cx(
            "absolute",
            "inset-0",
            "w-full",
            "h-full",
            "object-cover",
            "object-center"
          )}
          style={placeholder.style}
        />
      )}
      {placeholderBlurhash && (
        <BlurhashCanvas
          hash={placeholderBlurhash.hash}
          width={placeholderBlurhash.height}
          height={placeholderBlurhash.width}
          punch={1}
          className={cx("absolute", "inset-0", "w-full", "h-full")}
        />
      )}
      {placeholderPixelsCSS && (
        <div
          className={cx("absolute", "inset-0", "w-full", "h-full")}
          style={{
            ...placeholder.style,
            ...placeholderPixelsCSS,
          }}
        />
      )}
      {placeholderPixelsSVG &&
        React.createElement(
          placeholderPixelsSVG[0],
          {
            ...placeholderPixelsSVG[1],
            style: {
              ...placeholder.style,
              ...placeholderPixelsSVG[1].style,
              transform: `scale(1.2) ${placeholderPixelsSVG[1].style.transform}`,
              filter: "blur(24px)",
            },
          },
          placeholderPixelsSVG[2].map((child) =>
            React.createElement(child[0], {
              key: [child[1].x, child[1].y].join(","),
              ...child[1],
            })
          )
        )}
      <Image
        alt={img.alt}
        title={img.title}
        src={img.src}
        width={4032}
        height={3024}
      />
    </a>
  </Layout>
);

export default Example;

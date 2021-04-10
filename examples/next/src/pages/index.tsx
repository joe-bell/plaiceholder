import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { cx } from "@/styles";
import { Layout } from "@/components/layout";
import { config } from "@/data/config";
import { getAllPublicImagePaths } from "@/lib/images";
import { getImage } from "@plaiceholder/next";
import { getPixelsCSS } from "@plaiceholder/css";

export const getStaticProps = async () => {
  const imagePaths = getAllPublicImagePaths();

  const plaiceholders = await Promise.all(
    imagePaths.map(async (src) => {
      const image = await getImage(src);
      const pixelsCSS = await getPixelsCSS(image);

      return pixelsCSS;
    })
  ).then((values) => values);

  return {
    props: {
      plaiceholders,
      examples: config.examples,
    },
  };
};

const Index: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  plaiceholders,
  examples,
}) => {
  return (
    <Layout>
      <h1 className={cx("font-semibold", "text-3xl", "mt-8")}>Examples</h1>

      <ul
        className={cx(
          "mt-6",
          "grid",
          "sm:grid-cols-2",
          "md:grid-cols-4",
          "gap-4",
          "place-content-stretch",
          "text-center"
        )}
      >
        {examples.map((example, i) => (
          <li key={example.slug}>
            <Link href={`multiple/${example.slug}`}>
              <a
                className={cx(
                  "group",
                  "rounded-md",
                  "shadow-sm",
                  "inline-flex",
                  "items-center",
                  "justify-center",
                  "rounded-md",
                  "relative",
                  "overflow-hidden",
                  "px-8",
                  "py-10",
                  "w-full",
                  "h-full",
                  "bg-transparent",
                  "transition-colors",
                  "hover:bg-gray-300"
                )}
              >
                <span
                  className={cx(
                    "absolute",
                    "inset-0",
                    "w-full",
                    "h-full",
                    "filter",
                    "blur-md",
                    "transform",
                    "scale-150",
                    "mix-blend-multiply"
                  )}
                  style={plaiceholders[i]}
                />
                <span
                  className={cx(
                    "relative",
                    "overflow-hidden",
                    "no-underline",
                    "text-white",
                    "font-bold",
                    "text-xl"
                  )}
                >
                  {example.title}
                </span>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Index;

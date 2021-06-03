import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { cx } from "@/styles";
import { Layout } from "@/components/layout";
import { config } from "@/config";
import { getAllUnsplashImagePaths } from "@/lib/images";

export const getStaticProps = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const plaiceholders = await Promise.all(
    imagePaths.map(async (src) => {
      const { css } = await getPlaiceholder(src);

      return css;
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
}) => (
  <Layout variant="home" title="Next.js">
    <ul
      className={cx(
        "mt-8",
        "grid",
        "sm:grid-cols-2",
        "md:grid-cols-3",
        "gap-4",
        "place-content-stretch",
        "text-center"
      )}
    >
      {Object.keys(examples.pages).map((example, i) => (
        <li
          key={example}
          className={cx(
            "group",
            "rounded-md",
            "border",
            "border-gray-200",
            "shadow-sm",
            "grid",
            "rounded-lg",
            "relative",
            "overflow-hidden",
            "w-full",
            "h-full"
          )}
        >
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "filter",
              "blur-xl",
              "transform",
              "scale-150"
            )}
            style={plaiceholders[i]}
          />
          <p
            className={cx(
              "relative",
              "flex",
              "aspect-w-16",
              "aspect-h-9",
              "items-end"
            )}
          >
            <span
              className={cx(
                "absolute",
                "bottom-0",
                "px-4",
                "text-white",
                "font-bold",
                "text-2xl",
                "top-auto",
                "h-[unset]",
                "flex-1",
                "text-left"
              )}
            >
              {examples.pages[example].title}
            </span>
          </p>

          <ul className={cx("grid", "grid-cols-2", "gap-4", "p-4", "z-10")}>
            {Object.keys(examples.variants).map((variant) => {
              const href = `/${example}/${variant}`;
              return (
                <li key={href}>
                  <Link href={href}>
                    <a
                      className={cx(
                        "block",
                        "appearance-none",
                        "px-4",
                        "py-2",
                        "text-gray-700",
                        "font-medium",
                        "text-sm",
                        "bg-white",
                        "bg-opacity-80",
                        "hover:bg-opacity-100",
                        "focus:bg-opacity-100",
                        "hover:text-gray-800",
                        "focus:text-gray-800",
                        "rounded-md",
                        "capitalize",
                        "shadow-sm",
                        "transition-colors",
                        "duration-200",
                        "outline-none",
                        "focus:ring"
                      )}
                    >
                      {examples.variants[variant].title}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  </Layout>
);

export default Index;

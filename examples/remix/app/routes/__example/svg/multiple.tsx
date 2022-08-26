import path from "path";
import React from "react";
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";
import { getAllUnsplashImagePaths } from "~/lib/images.server";

interface LoaderData {
  images: (Pick<IGetPlaiceholderReturn, "img" | "svg"> & {
    alt: string;
    title: string;
  })[];
}

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { svg, img } = await getPlaiceholder(src, {
        // See https://github.com/remix-run/remix/discussions/4074
        dir: path.join(__dirname, "../public"),
      });

      return {
        alt: "Paint Splashes",
        img,
        svg,
        title: "Photo from Unsplash",
      };
    })
  ).then((values) => values);

  return json<LoaderData>({
    images,
  });
};

export default function SVGMultiple() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ alt, img, svg, title }) => (
        <ImageGridItem key={img.src}>
          {React.createElement(
            svg[0],
            {
              ...svg[1],
              style: {
                ...svg[1].style,
                transform: ["scale(1.5)", svg[1].style.transform].join(" "),
              },
              className: cx("filter", "blur-2xl", "z-[-1]"),
            },
            svg[2].map((child) =>
              React.createElement(child[0], {
                key: [child[1].x, child[1].y].join(","),
                ...child[1],
              })
            )
          )}
          <img className="text-transparent" alt={alt} title={title} {...img} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

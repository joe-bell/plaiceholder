import React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";
import { getAllUnsplashImagePaths } from "~/lib/images.server";

type LoaderData = {
  images: (Pick<IGetPlaiceholderReturn, "svg"> & {
    img: Record<"alt" | "title", string> & IGetPlaiceholderReturn["img"];
  })[];
};

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { svg, img } = await getPlaiceholder(src);

      return {
        svg,
        img: {
          ...img,
          alt: "Paint Splashes",
          title: "Photo from Unsplash",
        },
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
      {images.map(({ svg, img }) => (
        <ImageGridItem key={img.src}>
          {React.createElement(
            svg[0],
            {
              ...svg[1],
              style: {
                ...svg[1].style,
                transform: ["scale(1.5)", svg[1].style.transform].join(" "),
              },
              class: cx("filter", "blur-2xl", "z-[-1]"),
            },
            svg[2].map((child) =>
              React.createElement(child[0], {
                key: [child[1].x, child[1].y].join(","),
                ...child[1],
              })
            )
          )}
          <Image className="text-transparent" loaderUrl="/api/image" {...img} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

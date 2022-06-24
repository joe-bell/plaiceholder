import React from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";

type LoaderData = Pick<IGetPlaiceholderReturn, "svg" | "img">;

export const loader: LoaderFunction = async () => {
  const { svg, img } = await getPlaiceholder("/assets/keila-joa@578.jpg");

  return json<LoaderData>({
    svg,
    img,
  });
};

export default function SVGSingle() {
  const { svg, img } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={2}>
      <ImageGridItem>
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
        <Image
          className="text-transparent"
          loaderUrl="/api/image"
          src={img.src}
        />
      </ImageGridItem>
    </ImageGrid>
  );
}

import React from "react";
import {
  json,
  type HeadersFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { imageList, imageListItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";
import { config } from "~/config";

interface LoaderData {
  images: (Pick<IGetPlaiceholderReturn, "img" | "svg"> & {
    alt: string;
    title: string;
  })[];
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": config["Cache-Control"],
});

export const loader: LoaderFunction = async () => {
  const images = await Promise.all(
    config.examples.variants.multiple.unsplash.map(async (src) => {
      const { svg, img } = await getPlaiceholder(src);

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
    <ul className={imageList({ columns: 3, aspect: "5/7" })}>
      {images.map(({ alt, img, svg, title }) => (
        <li key={img.src} className={imageListItem()}>
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
        </li>
      ))}
    </ul>
  );
}

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

interface LoaderData extends Pick<IGetPlaiceholderReturn, "svg" | "img"> {
  alt: string;
  title: string;
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": config["Cache-Control"],
});

export const loader: LoaderFunction = async () => {
  const { svg, img } = await getPlaiceholder(
    config.examples.variants.single.unsplash
  );

  return json<LoaderData>({
    alt: "Keila Joa, Estonia",
    svg,
    img,
    title: "Photo by Joe Bell",
  });
};

export default function SVGSingle() {
  const { alt, img, svg, title } = useLoaderData<LoaderData>();

  return (
    <ul className={imageList({ columns: 2 })}>
      <li className={imageListItem()}>
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
    </ul>
  );
}

import {
  json,
  type HeadersFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { BlurhashCanvas } from "react-blurhash";
import { imageList, imageListItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";
import { config } from "~/config";

interface LoaderData extends Pick<IGetPlaiceholderReturn, "blurhash" | "img"> {
  alt: string;
  title: string;
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": config["Cache-Control"],
});

export const loader: LoaderFunction = async () => {
  const { blurhash, img } = await getPlaiceholder(
    config.examples.variants.single.unsplash
  );

  return json<LoaderData>({
    alt: "Keila Joa, Estonia",
    blurhash,
    img,
    title: "Photo by Joe Bell",
  });
};

export default function BlurhashSingle() {
  const { alt, blurhash, img, title } = useLoaderData<LoaderData>();

  return (
    <ul className={imageList({ columns: 2 })}>
      <li className={imageListItem()}>
        <BlurhashCanvas
          hash={blurhash.hash}
          width={blurhash.height}
          height={blurhash.width}
          punch={1}
          className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
        />
        <img className="text-transparent" alt={alt} title={title} {...img} />
      </li>
    </ul>
  );
}

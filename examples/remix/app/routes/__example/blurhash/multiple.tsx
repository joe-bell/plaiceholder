import {
  json,
  type HeadersFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { BlurhashCanvas } from "react-blurhash";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";
import { config } from "~/config";

interface LoaderData {
  images: (Pick<IGetPlaiceholderReturn, "blurhash" | "img"> & {
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
      const { blurhash, img } = await getPlaiceholder(src);

      return {
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        blurhash,
        img,
      };
    })
  ).then((values) => values);

  return json<LoaderData>({
    images,
  });
};

export default function BlurhashMultiple() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ blurhash, img, alt, title }) => (
        <ImageGridItem key={img.src}>
          <BlurhashCanvas
            hash={blurhash.hash}
            width={blurhash.height}
            height={blurhash.width}
            punch={1}
            className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
          />
          <img className="text-transparent" alt={alt} title={title} {...img} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";

import type { IGetPlaiceholderReturn } from "~/lib/plaiceholder.server";
import { getPlaiceholder } from "~/lib/plaiceholder.server";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import { getAllUnsplashImagePaths } from "~/lib/images.server";

type LoaderData = {
  images: (Pick<IGetPlaiceholderReturn, "base64"> & {
    img: Record<"alt" | "title", string> & IGetPlaiceholderReturn["img"];
  })[];
};

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { base64, img } = await getPlaiceholder(src);

      return {
        base64,
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

export default function TailwindSingle() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ base64, img }) => (
        <ImageGridItem key={img.src}>
          <img
            alt=""
            src={base64}
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              "transform",
              "scale-150",
              "filter",
              "blur-2xl",
              "z-[-1]"
            )}
          />
          <Image className="text-transparent" loaderUrl="/api/image" {...img} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

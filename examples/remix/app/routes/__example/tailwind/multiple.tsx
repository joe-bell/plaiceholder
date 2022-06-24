import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";

import { getPlaiceholder } from "~/lib/plaiceholder.server";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";

const getImagesFromPlaiceholders = (...plaiceholders: string[]) =>
  Promise.all(
    plaiceholders.map(async (plaiceholder) => {
      const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));
      return { plaiceholder, ...img };
    })
  );

type LoaderData = {
  images: Awaited<ReturnType<typeof getImagesFromPlaiceholders>>;
};

export const loader: LoaderFunction = async () => {
  const images = await getImagesFromPlaiceholders(
    "plaiceholder-[/assets/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
    "plaiceholder-[/assets/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
    "plaiceholder-[/assets/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
    "plaiceholder-[/assets/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
    "plaiceholder-[/assets/unsplash/solen-feyissa-tek55norwaQ.jpg]",
    "plaiceholder-[/assets/unsplash/solen-feyissa-WX1siNmy_R4.jpg]"
  );

  return json<LoaderData>({
    images,
  });
};

export default function TailwindSingle() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ plaiceholder, ...img }) => (
        <ImageGridItem key={plaiceholder}>
          <div
            className={cx(
              "absolute",
              "inset-0",
              "w-full",
              "h-full",
              plaiceholder,
              "transform",
              "scale-150",
              "filter",
              "blur-2xl",
              "z-[-1]"
            )}
          />
          <Image
            className="text-transparent"
            loaderUrl="/api/image"
            src={img.src}
          />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

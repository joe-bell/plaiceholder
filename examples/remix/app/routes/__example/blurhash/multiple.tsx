import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";
import { BlurhashCanvas } from "react-blurhash";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";
import { getAllUnsplashImagePaths } from "~/lib/images.server";

type LoaderData = {
  images: (Pick<IGetPlaiceholderReturn, "blurhash"> & {
    img: Record<"alt" | "title", string> & IGetPlaiceholderReturn["img"];
  })[];
};

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { blurhash, img } = await getPlaiceholder(src);

      return {
        blurhash,
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

export default function BlurhashMultiple() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ blurhash, img }) => (
        <ImageGridItem key={img.src}>
          <BlurhashCanvas
            hash={blurhash.hash}
            width={blurhash.height}
            height={blurhash.width}
            punch={1}
            className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
          />
          <Image className="text-transparent" loaderUrl="/api/image" {...img} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

import path from "path";
import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { BlurhashCanvas } from "react-blurhash";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";
import { getAllUnsplashImagePaths } from "~/lib/images.server";

interface LoaderData {
  images: (Pick<IGetPlaiceholderReturn, "blurhash" | "img"> & {
    alt: string;
    title: string;
  })[];
}

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { blurhash, img } = await getPlaiceholder(src, {
        // See https://github.com/remix-run/remix/discussions/4074
        dir: path.join(__dirname, "../public"),
      });

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

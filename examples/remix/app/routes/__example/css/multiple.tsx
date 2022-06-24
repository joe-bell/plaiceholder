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
  images: (Pick<IGetPlaiceholderReturn, "css"> & {
    img: Record<"alt" | "title", string> & IGetPlaiceholderReturn["img"];
  })[];
};

export const loader: LoaderFunction = async () => {
  const imagePaths = getAllUnsplashImagePaths();

  const images = await Promise.all(
    imagePaths.map(async (src) => {
      const { css, img } = await getPlaiceholder(src);

      return {
        css,
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

export default function CSSMultiple() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ css, img }) => (
        <ImageGridItem key={img.src}>
          <div
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
            style={css}
          />
          <Image className="text-transparent" loaderUrl="/api/image" {...img} />
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
}

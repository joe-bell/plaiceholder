import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";
import { BlurhashCanvas } from "react-blurhash";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";

type LoaderData = Pick<IGetPlaiceholderReturn, "blurhash" | "img">;

export const loader: LoaderFunction = async () => {
  const { blurhash, img } = await getPlaiceholder("/assets/keila-joa@578.jpg");

  return json<LoaderData>({
    blurhash,
    img,
  });
};

export default function BlurhashSingle() {
  const { blurhash, img } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={2}>
      <ImageGridItem>
        <BlurhashCanvas
          hash={blurhash.hash}
          width={blurhash.height}
          height={blurhash.width}
          punch={1}
          className={cx("absolute", "inset-0", "w-full", "h-full", "z-[-1]")}
        />
        <Image
          className="text-transparent"
          loaderUrl="/api/image"
          src={img.src}
        />
      </ImageGridItem>
    </ImageGrid>
  );
}

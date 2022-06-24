import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";

type LoaderData = Pick<IGetPlaiceholderReturn, "base64" | "img">;

export const loader: LoaderFunction = async () => {
  const { base64, img } = await getPlaiceholder("/assets/keila-joa@578.jpg");

  return json<LoaderData>({
    base64,
    img,
  });
};

export default function Base64Single() {
  const { base64, img } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={2}>
      <ImageGridItem>
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
        <Image
          className="text-transparent"
          loaderUrl="/api/image"
          src={img.src}
        />
      </ImageGridItem>
    </ImageGrid>
  );
}

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";

type LoaderData = Pick<IGetPlaiceholderReturn, "css" | "img">;

export const loader: LoaderFunction = async () => {
  const { css, img } = await getPlaiceholder("/assets/keila-joa@578.jpg");

  return json<LoaderData>({
    css,
    img,
  });
};

export default function CSSSingle() {
  const { css, img } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={2}>
      <ImageGridItem>
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
        <Image
          className="text-transparent"
          loaderUrl="/api/image"
          src={img.src}
        />
      </ImageGridItem>
    </ImageGrid>
  );
}

import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import Image from "remix-image";
import type { IGetPlaiceholderReturn } from "~/lib/plaiceholder.server";
import { getPlaiceholder } from "~/lib/plaiceholder.server";

import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";

type LoaderData = {
  plaiceholder: string;
  // @TODO: Provide a nicer TypeScript experience here
  img: IGetPlaiceholderReturn["img"];
};

export const loader: LoaderFunction = async () => {
  const plaiceholder = "plaiceholder-[/assets/keila-joa@578.jpg]";
  const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));

  return json<LoaderData>({ img, plaiceholder });
};

export default function Index() {
  const { plaiceholder, img } = useLoaderData<LoaderData>();

  return (
    <ImageGrid>
      <ImageGridItem>
        <div
          className={cx(
            "absolute",
            "inset-0",
            "w-full",
            "h-full",
            plaiceholder || "",
            "transform",
            "scale-150",
            "filter",
            "blur-2xl"
          )}
        >
          <Image className={""} loaderUrl="/api/image" src={img.src} />
        </div>
      </ImageGridItem>
    </ImageGrid>
  );
}

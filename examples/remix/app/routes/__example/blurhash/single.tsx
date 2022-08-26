import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { BlurhashCanvas } from "react-blurhash";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";

interface LoaderData extends Pick<IGetPlaiceholderReturn, "blurhash" | "img"> {
  alt: string;
  title: string;
}

export const loader: LoaderFunction = async () => {
  const { blurhash, img } = await getPlaiceholder(
    "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80"
  );

  return json<LoaderData>({
    alt: "Keila Joa, Estonia",
    blurhash,
    img,
    title: "Photo by Joe Bell",
  });
};

export default function BlurhashSingle() {
  const { alt, blurhash, img, title } = useLoaderData<LoaderData>();

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
        <img className="text-transparent" alt={alt} title={title} {...img} />
      </ImageGridItem>
    </ImageGrid>
  );
}

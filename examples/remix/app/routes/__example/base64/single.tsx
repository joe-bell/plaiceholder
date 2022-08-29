import {
  json,
  type HeadersFunction,
  type LoaderFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import type { IGetPlaiceholderReturn } from "~/modules/plaiceholder.server";
import { getPlaiceholder } from "~/modules/plaiceholder.server";
import { config } from "~/config";

interface LoaderData extends Pick<IGetPlaiceholderReturn, "base64" | "img"> {
  alt: string;
  title: string;
}

export const headers: HeadersFunction = () => ({
  "Cache-Control": config["Cache-Control"],
});

export const loader: LoaderFunction = async () => {
  const { base64, img } = await getPlaiceholder(
    config.examples.variants.single.unsplash
  );

  return json<LoaderData>({
    alt: "Keila Joa, Estonia",
    base64,
    img,
    title: "Photo by Joe Bell",
  });
};

export default function Base64Single() {
  const { alt, base64, img, title } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={2}>
      <ImageGridItem>
        <img
          aria-hidden
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
        <img className="text-transparent" alt={alt} title={title} {...img} />
      </ImageGridItem>
    </ImageGrid>
  );
}

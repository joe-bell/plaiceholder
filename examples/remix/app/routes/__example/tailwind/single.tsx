import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";

interface LoaderData extends Pick<IGetPlaiceholderReturn, "img"> {
  alt: string;
  plaiceholder: string;
  title: string;
}

export const loader: LoaderFunction = async () => {
  const plaiceholder = "plaiceholder-[/assets/images/keila-joa@578px.jpg]";
  const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));

  return json<LoaderData>({
    alt: "Keila Joa, Estonia",
    img,
    plaiceholder,
    title: "Photo by Joe Bell",
  });
};

export default function TailwindSingle() {
  const { alt, img, plaiceholder, title } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={2}>
      <ImageGridItem>
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
        <img className="text-transparent" alt={alt} title={title} {...img} />
      </ImageGridItem>
    </ImageGrid>
  );
}

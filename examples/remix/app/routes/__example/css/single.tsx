import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import {
  getPlaiceholder,
  type IGetPlaiceholderReturn,
} from "~/modules/plaiceholder.server";

interface LoaderData extends Pick<IGetPlaiceholderReturn, "css" | "img"> {
  alt: string;
  title: string;
}

export const loader: LoaderFunction = async () => {
  const { css, img } = await getPlaiceholder(
    "/assets/images/keila-joa@578px.jpg"
  );

  return json<LoaderData>({
    alt: "Keila Joa, Estonia",
    css,
    img,
    title: "Photo by Joe Bell",
  });
};

export default function CSSSingle() {
  const { alt, css, img, title } = useLoaderData<LoaderData>();

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
        <img className="text-transparent" alt={alt} title={title} {...img} />
      </ImageGridItem>
    </ImageGrid>
  );
}

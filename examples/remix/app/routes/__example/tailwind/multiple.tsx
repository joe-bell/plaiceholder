import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { cx } from "class-variance-authority";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { ImageGrid, ImageGridItem } from "@plaiceholder/ui";
import { getPlaiceholder } from "~/modules/plaiceholder.server";

const getImagesFromPlaiceholders = (...plaiceholders: string[]) =>
  Promise.all(
    plaiceholders.map(async (plaiceholder) => {
      const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));
      return {
        plaiceholder,
        alt: "Paint Splashes",
        title: "Photo from Unsplash",
        img,
      };
    })
  );

interface LoaderData {
  images: Awaited<ReturnType<typeof getImagesFromPlaiceholders>>;
}

export const loader: LoaderFunction = async () => {
  const images = await getImagesFromPlaiceholders(
    "plaiceholder-[/assets/images/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
    "plaiceholder-[/assets/images/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-tek55norwaQ.jpg]",
    "plaiceholder-[/assets/images/unsplash/solen-feyissa-WX1siNmy_R4.jpg]"
  );

  return json<LoaderData>({
    images,
  });
};

export default function TailwindMultiple() {
  const { images } = useLoaderData<LoaderData>();

  return (
    <ImageGrid columns={3}>
      {images.map(({ alt, plaiceholder, img, title }) => (
        <ImageGridItem key={plaiceholder}>
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
      ))}
    </ImageGrid>
  );
}

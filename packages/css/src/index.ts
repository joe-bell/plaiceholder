import { PlaiceholderImage, getPixels, rgb } from "@plaiceholder/core";

export type PixelsCSS = Record<
  | "backgroundImage"
  | "backgroundPosition"
  | "backgroundSize"
  | "backgroundRepeat",
  string
>;

export interface GetPixelsCSS {
  (imageBuffer: PlaiceholderImage): Promise<PixelsCSS>;
}

export const getPixelsCSS: GetPixelsCSS = async (imageBuffer) => {
  const { rows } = await getPixels(imageBuffer);

  const linearGradients = rows.map((row) => {
    const pixels = row.map((pixel) => rgb(pixel));

    const gradient = pixels
      .map((pixel, i) => {
        const start = i === 0 ? "" : ` ${(i / pixels.length) * 100}%`;
        const end =
          i === pixels.length ? "" : ` ${((i + 1) / pixels.length) * 100}%`;

        return `${pixel}${start}${end}`;
      })
      .join(",");

    return `linear-gradient(90deg, ${gradient})`;
  });

  const backgroundPosition = linearGradients
    .map((_, i) =>
      i === 0 ? "0 0 " : `0 ${(i / (linearGradients.length - 1)) * 100}%`
    )
    .join(",");

  const backgroundSize = `100% ${100 / linearGradients.length}%`;

  return {
    backgroundImage: linearGradients.join(","),
    backgroundPosition,
    backgroundSize,
    backgroundRepeat: "no-repeat",
  };
};

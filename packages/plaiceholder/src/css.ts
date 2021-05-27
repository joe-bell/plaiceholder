import type { IGetImageReturn } from "./get-image";

type TGetImageReturnCSS = IGetImageReturn["optimizedForCSS"];

const rgb = (channels: (number | string)[]) =>
  `rgb${channels.length === 4 ? "a" : ""}(${channels.join(",")})`;

export interface IGetCSSOptions extends TGetImageReturnCSS {}
export interface IGetCSSReturn
  extends Record<
    | "backgroundImage"
    | "backgroundPosition"
    | "backgroundSize"
    | "backgroundRepeat",
    string
  > {}

export interface IGetCSS {
  (options: IGetCSSOptions): IGetCSSReturn;
}

export const getCSS: IGetCSS = ({ info, rows }) => {
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

  if (linearGradients.length !== info.height) {
    console.error(
      "Woops! Something went wrong here and caused the color height to differ from the source height."
    );
  }

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

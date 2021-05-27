import { arrayChunk } from "./utils";
import type { IGetImageReturn } from "./get-image";

type TRects = [
  "rect",
  Record<"width" | "height" | "x" | "y" | "fillOpacity", {} & number> &
    Record<"fill", {} & string>
];

const rgb = (channels: string[]) => `rgb(${channels.slice(0, 3).join(",")})`;
const alphaToOpacity = (alpha: number) => ((alpha / 255) * 100) / 100;

type TGetImageReturnSVG = IGetImageReturn["optimizedForSVG"];

export interface IGetSVGOptions extends TGetImageReturnSVG {}
export type TGetSVGReturn = [
  "svg",
  {
    viewBox: string;
    width: string;
    height: string;
    shapeRendering: string;
    preserveAspectRatio: string;
    style: any;
    xmlns: string;
  },
  TRects[]
];

export interface IGetSVG {
  (options: IGetSVGOptions): TGetSVGReturn;
}

export const getSVG: IGetSVG = ({ data, info, rawBuffer }) => {
  const { channels, width, height } = info;

  const pixels = arrayChunk(rawBuffer, channels).map((value) => {
    const channelToProps = {
      3: { fill: rgb(value), fillOpacity: 1 },
      4: {
        fill: rgb(value),
        fillOpacity: alphaToOpacity(value[3]),
      },
    };

    if (!channelToProps.hasOwnProperty(channels)) {
      throw new Error(
        `Images with ${channels} channels aren't currently supported`
      );
    }

    return channelToProps[channels];
  });

  const chunkRects = arrayChunk(pixels, width).map((row, y) =>
    row.map((col, x): TRects[] => [
      "rect",
      {
        ...col,
        width: 1,
        height: 1,
        x,
        y,
      },
    ])
  );

  if (chunkRects.length !== height) {
    console.error(
      "Woops! Something went wrong here and caused the color height to differ from the source height."
    );
  }

  const rects: TRects[] = [].concat(...chunkRects);

  return [
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "100%",
      height: "auto",
      shapeRendering: "crispEdges",
      preserveAspectRatio: "none",
      viewBox: `0 0 ${width} ${height}`,
      style: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transformOrigin: "top left",
        transform: "translate(-50%, -50%)",
        right: 0,
        bottom: 0,
      },
    },
    rects,
  ];
};

import { arrayChunk, getPixels, PlaiceholderImage } from "@plaiceholder/core";

type PixelsRects = [
  "rect",
  Record<"width" | "height" | "x" | "y" | "fillOpacity", {} & number> &
    Record<"fill", {} & string>
];

export type PixelsSVG = [
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
  PixelsRects[]
];

const rgb = (channels: string[]) => `rgb(${channels.slice(0, 3).join(",")})`;
const alphaToOpacity = (alpha: number) => ((alpha / 255) * 100) / 100;

export interface GetPixelsSVG {
  (imageBuffer: PlaiceholderImage): Promise<PixelsSVG>;
}

export const getPixelsSVG: GetPixelsSVG = async (imageBuffer) => {
  const { buffer, channels, width, height } = await getPixels(imageBuffer);

  const pixels = arrayChunk(buffer, channels).map((value) => {
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
    row.map((col, x): PixelsRects[] => [
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

  const rects: PixelsRects[] = [].concat(...chunkRects);

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
        transform: "translate(-50%, -50%)",
        right: 0,
        bottom: 0,
      },
    },
    rects,
  ];
};

import sizeOf from "image-size";
import sharp, { type Sharp } from "sharp";

/* Utils
   =========================================== */

export const arrayChunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...arrayChunk(arr.slice(size), size)]
    : [arr];

const rgb = (channels: string[] | number[]) =>
  `rgb(${channels.slice(0, 3).join(",")})`;
const rgba = (channels: number[]) =>
  `rgba(${channels.slice(0, 3).join(",")},${(channels[3] / 255).toFixed(3)})`;
const alphaToOpacity = (alpha: number) => ((alpha / 255) * 100) / 100;

/* Types
   =========================================== */

export const ACCEPTED_FILE_TYPES = ["jpeg", "png"] as const;

type SharpFormatOptions = Parameters<Sharp["toFormat"]>;
type SharpModulateOptions = Parameters<Sharp["modulate"]>[0];

/* getImg
   =========================================== */

const getImg = (data: Buffer) => {
  const { height, width, type } = sizeOf(data);
  return { height, width, type };
};

/* getPixels
   =========================================== */

const getPixels = ({
  data,
  info,
}: {
  data: Buffer;
  info: sharp.OutputInfo;
}) => {
  const { channels, width } = info;

  // !@TODO
  // switch to unit8?
  const rawBuffer = [].concat(...data) as number[];
  const allPixels = arrayChunk(rawBuffer, channels) as number[][][];
  const rows = arrayChunk(allPixels, width) as number[][][];

  return {
    rawBuffer,
    rows,
  };
};

/* getCSS
   =========================================== */

export interface IGetCSSOptions {
  data: Buffer;
  info: sharp.OutputInfo;
  rawBuffer: number[];
  rows: number[][][];
}

export interface IGetCSSReturn
  extends Record<
    | "backgroundImage"
    | "backgroundPosition"
    | "backgroundSize"
    | "backgroundRepeat",
    string
  > {}

export interface IGetCSS {
  (options: { data: Buffer; info: sharp.OutputInfo }): IGetCSSReturn;
}

export const getCSS: IGetCSS = ({ data, info }) => {
  const { rows } = getPixels({ data, info });

  const linearGradients = rows.map((row) => {
    const pixels = row.map((pixel) =>
      pixel.length === 4 ? rgba(pixel) : rgb(pixel)
    );

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

/* getSVG
   =========================================== */

type TRects = [
  "rect",
  Record<"width" | "height" | "x" | "y" | "fillOpacity", {} & number> &
    Record<"fill", {} & string>
];

export interface IGetSVGOptions {
  data: Buffer;
  info: sharp.OutputInfo;
}
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

export const getSVG: IGetSVG = ({ data, info }) => {
  const { rawBuffer } = getPixels({ data, info });

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
      height: "100%",
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

/* getPlaiceholder
   =========================================== */

export type TGetPlaiceholderSrc = Buffer;
export interface IGetPlaiceholderOptions extends SharpModulateOptions {
  size?: number;
  format?: SharpFormatOptions;
  removeAlpha?: boolean;
}
export interface IGetPlaiceholderReturn {
  img: {
    height: number;
    width: number;
    type?: string;
  };
  base64: string;
  css: IGetCSSReturn;
  svg: TGetSVGReturn;
}

export interface IGetPlaiceholder {
  (
    src: TGetPlaiceholderSrc,
    options?: IGetPlaiceholderOptions
  ): Promise<IGetPlaiceholderReturn>;
}

export const getPlaiceholder: IGetPlaiceholder = async (
  src,
  {
    size = 4,
    format = ["png"],
    brightness = 1,
    saturation = 1.2,
    removeAlpha = true,
    ...options
  }
) => {
  /* Optimize
   =========================================== */

  const sizeMin = 4;
  const sizeMax = 64;

  const isSizeValid = sizeMin <= size && size <= sizeMax;

  !isSizeValid &&
    console.error(
      ["Please enter a `size` value between", sizeMin, "and", sizeMax].join(" ")
    );

  const pipelineBeforeAlpha = sharp(src)
    .resize(size, size, {
      fit: "inside",
    })
    .toFormat(...format)
    .modulate({
      brightness,
      saturation,
      ...(options?.hue ? { hue: options?.hue } : {}),
      ...(options?.lightness ? { lightness: options?.lightness } : {}),
    });

  const pipeline =
    removeAlpha === false
      ? pipelineBeforeAlpha
      : pipelineBeforeAlpha.removeAlpha();

  /* Returns
   =========================================== */

  const img = getImg(src);

  const imgNew = await sharp(src)
    .metadata()
    .then(({ height, width, format }) => ({
      height,
      width,
      type: format,
    }));

  const base64 = await pipeline
    .clone()
    .normalise()
    .toBuffer({ resolveWithObject: true })
    .then(
      ({ data, info }) =>
        `data:image/${info.format};base64,${data.toString("base64")}`
    )
    .catch((err) => {
      console.error("base64 generation failed", err);
      throw err;
    });

  const { css, svg } = await pipeline
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const css = getCSS({ data, info });
      const svg = getSVG({ data, info });

      return {
        css,
        svg,
      };
    })
    .catch((err) => {
      console.error("pixel generation failed", err);
      throw err;
    });

  return {
    img,
    imgNew,
    css,
    base64,
    svg,
  };
};

import fs from "fs";
import path from "path";
import { promisify } from "util";
import sizeOf from "image-size";
import sharp from "sharp";
import { arrayChunk } from "./utils";

export type TBuffer = Buffer;
export type TImage = TBuffer | string;

export type TLoadImageParam = TImage;
export interface ILoadImageReturn {
  img: {
    src: string;
    height: number;
    width: number;
    type?: string;
  };
  buffer: TBuffer;
}

export interface ILoadImage {
  (imagePath: TLoadImageParam): Promise<ILoadImageReturn>;
}

export const loadImage: ILoadImage = async (imagePath) => {
  if (Buffer.isBuffer(imagePath)) {
    return {
      buffer: imagePath,
      img: {
        src: undefined,
        ...sizeOf(imagePath),
      },
    };
  }

  if (imagePath.startsWith("http")) {
    throw new Error("Sorry, remote images aren't supported just yet");
  }

  if (!imagePath.startsWith("/")) {
    throw new Error(
      `Failed to parse \"${imagePath}\", relative images must start with a leading slash`
    );
  }

  const buffer = await promisify(fs.readFile)(
    path.join("./public/", imagePath)
  );

  return {
    buffer,
    img: {
      src: imagePath,
      ...sizeOf(buffer),
    },
  };
};

export type TOptimizeImageSrc = TBuffer;

export interface IOptimizeImageOptions {
  size?: number;
}
export interface IOptimizeImageReturnValue {
  data: Buffer;
  info: sharp.OutputInfo;
  rawBuffer: number[];
  rows: number[][][];
}
export interface IOptimizeImageReturn
  extends Record<
    | "optimizedForBase64"
    | "optimizedForBlurhash"
    | "optimizedForCSS"
    | "optimizedForSVG",
    IOptimizeImageReturnValue
  > {}

export interface IOptimizeImage {
  (
    src: TOptimizeImageSrc,
    options?: IOptimizeImageOptions
  ): Promise<IOptimizeImageReturn>;
}

export const optimizeImage: IOptimizeImage = async (
  src,
  options = { size: 4 }
) => {
  const sizeMin = 4;
  const sizeMax = 64;

  const isSizeValid = sizeMin <= options.size && options.size <= sizeMax;
  !isSizeValid &&
    console.error(
      ["Please enter a `size` value between", sizeMin, "and", sizeMax].join(" ")
    );

  const size = isSizeValid ? options.size : 4;

  const pipeline = sharp(src).resize(size, size, {
    fit: "inside",
  });

  const getOptimizedForBase64 = pipeline
    .clone()
    .normalise()
    .modulate({ saturation: 1.2, brightness: 1 })
    .removeAlpha()
    .toBuffer({ resolveWithObject: true });

  const getOptimizedForBlurhash = pipeline
    .clone()
    .raw()
    .ensureAlpha()
    .toBuffer({ resolveWithObject: true });

  const getOptimizedForPixels = pipeline
    .clone()
    .raw()
    .toBuffer({ resolveWithObject: true });

  return Promise.all([
    getOptimizedForBase64,
    getOptimizedForBlurhash,
    getOptimizedForPixels,
  ])

    .then((values) =>
      values.map((value) => {
        const { channels, width } = value.info;

        const rawBuffer = [].concat(...value.data) as number[];
        const pixels = arrayChunk(rawBuffer, channels);
        const rows = arrayChunk(pixels, width);

        return {
          ...value,
          rawBuffer,
          rows,
        };
      })
    )
    .then((values) => ({
      optimizedForBase64: values[0],
      optimizedForBlurhash: values[1],
      optimizedForCSS: values[2],
      optimizedForSVG: values[2],
    }))
    .catch((err) => {
      console.error("transform failed", err);
      throw err;
    });
};

export type TGetImageSrc = TLoadImageParam;
export interface IGetImageOptions extends IOptimizeImageOptions {}
export interface IGetImageReturn
  extends ILoadImageReturn,
    IOptimizeImageReturn {}

export interface IGetImage {
  (src: TGetImageSrc, options?: IGetImageOptions): Promise<IGetImageReturn>;
}

export const getImage: IGetImage = async (src, options) => {
  const { buffer, img } = await loadImage(src);
  const optimized = await optimizeImage(buffer, options);

  return {
    img,
    buffer,
    ...optimized,
  };
};

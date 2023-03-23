import path from "path";
import NodeCache from "node-cache";
import fetch from "node-fetch";
import sizeOf from "image-size";
import sharp, { type Sharp, type FitEnum } from "sharp";
import { arrayChunk } from "./utils";
import { defaults } from "./defaults";

type TImage = Buffer | string;

/* getImageSize
   =========================================== */

type TGetImageSizeParam = TImage;
interface IGetImageSizeReturn {
  height: number;
  width: number;
  type?: string;
}

interface IGetImageSize {
  (file: TGetImageSizeParam): IGetImageSizeReturn;
}

const getImageSize: IGetImageSize = (file) => {
  const { width, height, type } = sizeOf(file);

  return {
    width,
    height,
    type,
  };
};

/* loadImage
   =========================================== */

const remoteImageCache = new NodeCache();

interface ILoadRemoteImage {
  (src: string): Promise<Buffer>;
}

const loadRemoteImage: ILoadRemoteImage = async (src) => {
  const cachedImage = remoteImageCache.get(src);

  if (typeof cachedImage === "undefined") {
    const response = await fetch(src);
    const buffer = await response.buffer();

    remoteImageCache.set(src, buffer);

    return buffer;
  }

  if (!Buffer.isBuffer(cachedImage))
    throw Error(`Cached value for ${src} is invalid.`);

  return cachedImage;
};

interface ILoadImageImg extends IGetImageSizeReturn {
  src: string;
}
interface ILoadImageOptions {
  dir?: string;
}
interface ILoadImageReturn {
  img: ILoadImageImg;
  file: TImage;
}

interface ILoadImage {
  (imagePath: TImage, options: ILoadImageOptions): Promise<ILoadImageReturn>;
}

const loadImage: ILoadImage = async (imagePath, options) => {
  if (Buffer.isBuffer(imagePath)) {
    const imageSize = getImageSize(imagePath);

    return {
      file: imagePath,
      img: {
        src: null,
        ...imageSize,
      },
    };
  }

  if (imagePath.startsWith("http")) {
    const buffer = await loadRemoteImage(imagePath);
    const imageSize = getImageSize(buffer);

    return {
      file: buffer,
      img: {
        src: imagePath,
        ...imageSize,
      },
    };
  }

  if (!imagePath.startsWith("/"))
    throw new Error(
      `Failed to parse src \"${imagePath}\", if using relative image it must start with a leading slash "/"`
    );

  const file = path.join(options?.dir || defaults.dir, imagePath);
  const imageSize = getImageSize(file);

  return {
    file,
    img: {
      src: imagePath,
      ...imageSize,
    },
  };
};

/* optimizeImage
   =========================================== */

type SharpFormatOptions = Parameters<Sharp["toFormat"]>;
type SharpModulateOptions = Parameters<Sharp["modulate"]>[0];

interface IOptimizeImageOptions extends SharpModulateOptions {
  size?: number;
  format?: SharpFormatOptions;
  // Note: `removeAlpha` is a no-op for blurhash
  //        See https://github.com/woltapp/blurhash/issues/100
  removeAlpha?: boolean;
  // Note: `autoOrient` is a no-op for images without EXIF data
  autoOrient?: boolean;
  fit?: keyof FitEnum;
}
interface IOptimizeImageReturn
  extends Record<
    | "optimizedForBase64"
    | "optimizedForBlurhash"
    | "optimizedForCSS"
    | "optimizedForSVG",
    {
      data: Buffer;
      info: sharp.OutputInfo;
      rawBuffer: number[];
      rows: number[][][];
    }
  > {}

interface IOptimizeImage {
  (src: TImage, options?: IOptimizeImageOptions): Promise<IOptimizeImageReturn>;
}

const optimizeImage: IOptimizeImage = async (src, options) => {
  const size = options?.size || defaults.size;

  const sizeMin = 4;
  const sizeMax = 64;

  const isSizeValid = sizeMin <= size && size <= sizeMax;

  !isSizeValid &&
    console.error(
      ["Please enter a `size` value between", sizeMin, "and", sizeMax].join(" ")
    );

  const pipelineBeforeAlpha = sharp(src)
    .rotate()
    .resize(size, size, {
      fit: options?.fit || defaults?.fit,
    })
    .toFormat(...(options?.format || defaults?.format))
    .modulate({
      brightness: options?.brightness || defaults?.brightness,
      saturation: options?.saturation || defaults?.saturation,
      ...(options?.hue ? { hue: options?.hue } : {}),
      ...(options?.lightness ? { lightness: options?.lightness } : {}),
    });

  const pipelineBeforeAutoOrient =
    // Defaults to `true` (as pet defaults.ts)
    options?.removeAlpha === false
      ? pipelineBeforeAlpha
      : pipelineBeforeAlpha.removeAlpha();

  const pipeline =
    // Defaults to `false` (as pet defaults.ts)
    options?.autoOrient === false
      ? pipelineBeforeAutoOrient
      : pipelineBeforeAutoOrient.rotate();

  const getOptimizedForBase64 = pipeline
    .clone()
    .normalise()
    .toBuffer({ resolveWithObject: true });

  const getOptimizedForBlurhash =
    // See above note about `removeAlpha`
    pipelineBeforeAlpha
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

/* getImage
   =========================================== */

export type TGetImageSrc = TImage;
export interface IGetImageOptions
  extends ILoadImageOptions,
    IOptimizeImageOptions {}
export interface IGetImageReturn
  extends Omit<ILoadImageReturn, "file">,
    IOptimizeImageReturn {}

export interface IGetImage {
  (src: TGetImageSrc, options?: IGetImageOptions): Promise<IGetImageReturn>;
}

export const getImage: IGetImage = async (src, options) => {
  const { file, img } = await loadImage(src, options);
  const optimized = await optimizeImage(file, options);

  return {
    img,
    ...optimized,
  };
};

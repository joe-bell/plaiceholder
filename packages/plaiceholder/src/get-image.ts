import sizeOf from "image-size";
import sharp, { type Sharp } from "sharp";
import { arrayChunk } from "./utils";
import { defaults } from "./defaults";

type SharpFormatOptions = Parameters<Sharp["toFormat"]>;
type SharpModulateOptions = Parameters<Sharp["modulate"]>[0];

/* getImage
   =========================================== */

export type TGetImageSrc = Buffer;
export interface IGetImageOptions extends SharpModulateOptions {
  size?: number;
  format?: SharpFormatOptions;
  // Note: `removeAlpha` is a no-op for blurhash
  //        See https://github.com/woltapp/blurhash/issues/100
  removeAlpha?: boolean;
}
export interface IGetImageReturn
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
  > {
  img: {
    height: number;
    width: number;
    type?: string;
  };
}

export interface IGetImage {
  (src: TGetImageSrc, options?: IGetImageOptions): Promise<IGetImageReturn>;
}

export const getImage: IGetImage = async (src, options) => {
  /**
   * `img` attributes
   */
  const { height, width, type } = sizeOf(src);
  const img = { height, width, type };

  /**
   * Optimize images ready for placeholder creation
   */
  const size = options?.size || defaults.size;

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
    .toFormat(...(options?.format || defaults?.format))
    .modulate({
      brightness: options?.brightness || defaults?.brightness,
      saturation: options?.saturation || defaults?.saturation,
      ...(options?.hue ? { hue: options?.hue } : {}),
      ...(options?.lightness ? { lightness: options?.lightness } : {}),
    });

  const pipeline =
    // Defaults to `true` (as pet defaults.ts)
    options?.removeAlpha === false
      ? pipelineBeforeAlpha
      : pipelineBeforeAlpha.removeAlpha();

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

  const optimized = await Promise.all([
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

  return {
    img,
    ...optimized,
  };
};

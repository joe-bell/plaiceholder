import fs from "fs";
import path from "path";
import sharp from "sharp";
import { promisify } from "util";
import sizeOf from "image-size";
import type { ISizeCalculationResult } from "image-size/dist/types/interface";

export const ACCEPTED_FILE_TYPES = ["jpeg", "png"] as const;

export type PlaiceholderImage = Buffer;
export type PlaiceholderPixels = {
  buffer: any[];
  rows: number[][][];
} & Record<"channels" | "width" | "height", number>;

export const arrayChunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...arrayChunk(arr.slice(size), size)]
    : [arr];

export interface GetPixels {
  (imageBuffer: PlaiceholderImage): Promise<PlaiceholderPixels>;
}

export const getPixels: GetPixels = async (imageBuffer) =>
  new Promise((resolve, reject) => {
    sharp(imageBuffer)
      .resize(10, 10, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { channels, width, height } = info;

        // @ts-ignore
        const buffer = [].concat(...data);
        const pixels = arrayChunk(buffer, channels);
        const rows = arrayChunk(pixels, width);

        if (rows.length !== height) {
          console.error(
            "Woops! Something went wrong here and caused the color height to differ from the source height."
          );
        }

        resolve({
          buffer,
          rows,
          channels,
          width,
          height,
        });
      })
      .catch((err) => {
        if (err) return reject(err);
      });
  });

export type GetImagePath = string;

export interface GetImage {
  (imagePath: GetImagePath): Promise<
    {
      buffer: PlaiceholderImage;
    } & ISizeCalculationResult
  >;
}

export const getImage: GetImage = async (imagePath) => {
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

  const details = sizeOf(buffer);

  return {
    buffer,
    ...details,
  };
};

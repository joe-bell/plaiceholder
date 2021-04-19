import fs from "fs";
import path from "path";
import { promisify } from "util";
import sizeOf from "image-size";
import type { ISizeCalculationResult } from "image-size/dist/types/interface";
import { PlaiceholderImage } from "@plaiceholder/core";

type B = typeof sizeOf;

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

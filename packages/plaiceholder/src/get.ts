import fs from "fs";
import path from "path";
import { promisify } from "util";
import sizeOf from "image-size";
import type { ISizeCalculationResult } from "image-size/dist/types/interface";
import type { TBuffer } from "./core";

export type TImage = TBuffer | string;

export interface IGetImage {
  (imagePath: TImage): Promise<
    {
      buffer: TBuffer;
    } & ISizeCalculationResult
  >;
}

export const getImage: IGetImage = async (imagePath) => {
  if (Buffer.isBuffer(imagePath)) {
    return {
      buffer: imagePath,
      ...sizeOf(imagePath),
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
    ...sizeOf(buffer),
  };
};

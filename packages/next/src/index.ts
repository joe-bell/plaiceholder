import fs from "fs";
import path from "path";
import { promisify } from "util";
import { PlaiceholderImage } from "@plaiceholder/core";

export type GetImagePath = string;

export interface GetImage {
  (imagePath: GetImagePath): Promise<PlaiceholderImage>;
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

  const imageFile = await promisify(fs.readFile)(
    path.join("./src/public/", imagePath)
  );

  return imageFile;
};

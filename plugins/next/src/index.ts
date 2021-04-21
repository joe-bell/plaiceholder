import fs from "fs";
import path from "path";
import { promisify } from "util";
import { PlaiceholderImage } from "@plaiceholder/core";

export type GetImagePath = string;

export interface GetImage {
  (imagePath: GetImagePath): Promise<PlaiceholderImage>;
}

export const getImage: GetImage = async (imagePath) => {
  console.log(`
⚠️ DEPRECATION WARNING
\`getImage\` from @plaiceholder/next will be removed at a later date.
Please consider switching to:
\`getImage\` from @plaiceholder/get instead.
`);

  if (imagePath.startsWith("http")) {
    throw new Error("Sorry, remote images aren't supported just yet");
  }

  if (!imagePath.startsWith("/")) {
    throw new Error(
      `Failed to parse \"${imagePath}\", relative images must start with a leading slash`
    );
  }

  const imageFile = await promisify(fs.readFile)(
    path.join("./public/", imagePath)
  );

  return imageFile;
};

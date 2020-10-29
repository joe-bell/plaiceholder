import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { encode } from "blurhash";
import { validateImagePath, NextPlaceholderImagePath } from "next-placeholder";

export type NextBlurhash = string;

export interface GetBlurhash {
  (imagePath: NextPlaceholderImagePath): Promise<NextBlurhash>;
}

export const getBlurhash: GetBlurhash = async (imagePath) => {
  validateImagePath(imagePath);

  const imageFile = await promisify(fs.readFile)(
    path.join("./public/", imagePath)
  );

  const transform = new Promise<string>((resolve, reject) => {
    sharp(imageFile)
      .raw()
      .ensureAlpha()
      .resize(32, 32, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);
        resolve(encode(new Uint8ClampedArray(buffer), width, height, 4, 4));
      });
  });

  return Promise.all([imageFile, transform])
    .then((values) => values[1])
    .catch((error) => error);
};

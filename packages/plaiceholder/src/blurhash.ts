import sharp from "sharp";
import { encode } from "blurhash";
import type { PlaiceholderImage } from "./core";

const size = 32;

export type Blurhash = {
  hash: string;
} & Record<"width" | "height", number>;

export interface GetBlurhash {
  (imageBuffer: PlaiceholderImage): Promise<Blurhash>;
}

export const getBlurhash: GetBlurhash = async (imageBuffer) =>
  new Promise((resolve, reject) => {
    sharp(imageBuffer)
      .raw()
      .ensureAlpha()
      .resize(size, size, { fit: "inside" })
      .toBuffer((err, buffer, { width, height }) => {
        if (err) return reject(err);

        const hash = encode(new Uint8ClampedArray(buffer), width, height, 4, 4);

        resolve({
          hash,
          height,
          width,
        });
      });
  });

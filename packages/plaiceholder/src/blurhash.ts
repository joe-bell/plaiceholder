import sharp from "sharp";
import { encode } from "blurhash";
import type { TBuffer } from "./core";

const size = 32;

export type TBlurhash = {
  hash: string;
} & Record<"width" | "height", number>;

export interface IGetBlurhash {
  (imageBuffer: TBuffer): Promise<TBlurhash>;
}

export const getBlurhash: IGetBlurhash = async (imageBuffer) =>
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

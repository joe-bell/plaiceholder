import sharp from "sharp";
import type { TBuffer } from "./core";

export type TBase64 = string;

export interface IGetBase64 {
  (imageBuffer: TBuffer): Promise<TBase64>;
}

export const getBase64: IGetBase64 = async (imageBuffer) =>
  new Promise((resolve, reject) => {
    sharp(imageBuffer)
      .normalise()
      .modulate({
        saturation: 1.2,
        brightness: 1,
      })
      .removeAlpha()
      .resize(10, 10, { fit: "inside" })
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { format } = info;

        const base64 = `data:image/${format};base64,${data.toString("base64")}`;

        resolve(base64);
      })
      .catch((err) => {
        if (err) return reject(err);
      });
  });

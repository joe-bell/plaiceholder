import sharp from "sharp";
import { PlaiceholderImage } from "@plaiceholder/core";

export type Base64 = string;

export interface GetBase64 {
  (imageBuffer: PlaiceholderImage): Promise<Base64>;
}

export const getBase64: GetBase64 = async (imageBuffer) =>
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

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";

export type NextPlaceholderImagePath = string;
export type NextPlaceholderBase64 = string;

export interface ValidateImagePath {
  (imagePath: NextPlaceholderImagePath): void;
}

export const validateImagePath: ValidateImagePath = (imagePath) => {
  if (imagePath.startsWith("http")) {
    throw new Error("Sorry, remote images aren't supported just yet");
  }

  if (!imagePath.startsWith("/")) {
    throw new Error(
      `Failed to parse \"${imagePath}\", relative images must start with a leading slash`
    );
  }
};

export interface GetBase64 {
  (imagePath: NextPlaceholderImagePath): Promise<NextPlaceholderBase64>;
}

export const getBase64: GetBase64 = async (imagePath) => {
  validateImagePath(imagePath);

  const imageFile = await promisify(fs.readFile)(
    path.join("./public/", imagePath)
  );

  const imagePathExt = imagePath.split(".").slice(-1).pop();
  const base64Ext = { jpg: "jpeg" }[imagePathExt] || imagePathExt;

  const toBase64 = (buffer) =>
    `data:image/${base64Ext};base64,${buffer.toString("base64")}`;

  const transform = new Promise<NextPlaceholderBase64>((resolve, reject) => {
    sharp(imageFile)
      .normalise()
      .modulate({
        saturation: 1.2,
        brightness: 1,
      })
      .removeAlpha()
      .resize(10, 10, { fit: "inside" })
      .toBuffer((err, buffer) => {
        if (err) return reject(err);
        resolve(toBase64(buffer));
      });
  });

  return Promise.all([imageFile, transform])
    .then((values) => values[1])
    .catch((error) => error);
};

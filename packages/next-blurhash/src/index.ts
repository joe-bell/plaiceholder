import sharp from "sharp";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { encode } from "blurhash";

export const getStaticBlurhash = async (imgPath: string): Promise<string> => {
  if (imgPath.startsWith("http")) {
    throw new Error("Sorry, remote images aren't supported just yet");
  }

  if (!imgPath.startsWith("/")) {
    throw new Error(
      `Failed to parse \"${imgPath}\", relative images must start with a leading slash`
    );
  }

  const imageFile = await promisify(fs.readFile)(
    path.join("./public/", imgPath)
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

import sharp from "sharp";

export const ACCEPTED_FILE_TYPES = ["jpeg", "png"] as const;

export type PlaiceholderImage = Buffer;
export type PlaiceholderPixels = {
  buffer: any[];
  rows: number[][][];
} & Record<"channels" | "width" | "height", number>;

export const arrayChunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...arrayChunk(arr.slice(size), size)]
    : [arr];

export const rgb = (channels: (number | string)[]) =>
  `rgb${channels.length === 4 ? "a" : ""}(${channels.slice(0, 3).join(",")})`;

export interface GetPixels {
  (imageBuffer: PlaiceholderImage): Promise<PlaiceholderPixels>;
}

export const getPixels: GetPixels = async (imageBuffer) =>
  new Promise((resolve, reject) => {
    sharp(imageBuffer)
      .resize(10, 10, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { channels, width, height } = info;

        // @ts-ignore
        const buffer = [].concat(...data);
        const pixels = arrayChunk(buffer, channels);
        const rows = arrayChunk(pixels, width);

        if (rows.length !== height) {
          console.error(
            "Woops! Something went wrong here and caused the color height to differ from the source height."
          );
        }

        resolve({
          buffer,
          rows,
          channels,
          width,
          height,
        });
      })
      .catch((err) => {
        if (err) return reject(err);
      });
  });

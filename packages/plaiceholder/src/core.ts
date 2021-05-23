import sharp from "sharp";

export type TBuffer = Buffer;
export type TPixels = {
  buffer: any[];
  rows: number[][][];
} & Record<"channels" | "width" | "height", number>;

export const arrayChunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...arrayChunk(arr.slice(size), size)]
    : [arr];

export interface IGetPixels {
  (imageBuffer: TBuffer): Promise<TPixels>;
}

export const getPixels: IGetPixels = async (imageBuffer) =>
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

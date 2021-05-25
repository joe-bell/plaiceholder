import { encode } from "blurhash";
import type { IOptimizeImageReturnValue } from "./get";

export interface IGetBlurhashOptions extends IOptimizeImageReturnValue {}
export type IGetBlurhashReturn = {
  hash: string;
} & Record<"width" | "height", number>;

export interface IGetBlurhash {
  (options: IGetBlurhashOptions): IGetBlurhashReturn;
}

export const getBlurhash: IGetBlurhash = ({ data, info }) => {
  const { width, height } = info;

  const hash = encode(new Uint8ClampedArray(data), width, height, 4, 4);

  return {
    width,
    height,
    hash,
  };
};

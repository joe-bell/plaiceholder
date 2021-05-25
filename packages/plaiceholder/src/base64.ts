import type { IOptimizeImageReturnValue } from "./get";

export interface IGetBase64Options extends IOptimizeImageReturnValue {}
export type TGetBase64Return = string;

export interface IGetBase64 {
  (options: IGetBase64Options): TGetBase64Return;
}

export const getBase64: IGetBase64 = ({ data, info }) =>
  `data:image/${info.format};base64,${data.toString("base64")}`;

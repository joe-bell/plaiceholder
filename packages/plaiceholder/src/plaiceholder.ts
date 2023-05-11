import { getBase64, TGetBase64Return } from "./base64";
import { getBlurhash, IGetBlurhashReturn } from "./blurhash";
import { getCSS, IGetCSSReturn } from "./css";
import {
  getImage,
  TGetImageSrc,
  IGetImageOptions,
  IGetImageReturn,
} from "./get-image";
import { getSVG, TGetSVGReturn } from "./svg";

export type TGetPlaiceholderSrc = Buffer;
export interface IGetPlaiceholderOptions extends IGetImageOptions {}
export interface IGetPlaiceholderReturn extends Pick<IGetImageReturn, "img"> {
  base64: TGetBase64Return;
  blurhash: IGetBlurhashReturn;
  css: IGetCSSReturn;
  svg: TGetSVGReturn;
}

export interface IGetPlaiceholder {
  (
    src: TGetPlaiceholderSrc,
    options?: IGetPlaiceholderOptions
  ): Promise<IGetPlaiceholderReturn>;
}

export const getPlaiceholder: IGetPlaiceholder = async (src, options) => {
  const {
    img,
    optimizedForBase64,
    optimizedForBlurhash,
    optimizedForCSS,
    optimizedForSVG,
  } = await getImage(src, options);

  return Promise.all([
    getBase64(optimizedForBase64),
    getBlurhash(optimizedForBlurhash),
    getCSS(optimizedForCSS),
    getSVG(optimizedForSVG),
  ]).then((values) => {
    const [base64, blurhash, css, svg] = values;

    return {
      img,
      css,
      base64,
      blurhash,
      svg,
    };
  });
};

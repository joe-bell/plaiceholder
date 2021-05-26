import glob from "glob";

export const getAllUnsplashImagePaths = (): string[] =>
  glob.sync("./public/assets/unsplash/*.{jpg,png}").map((file) => {
    const sep = "/";
    const fileArr = file.split(sep);

    const filePath = fileArr
      .slice(fileArr.indexOf("public") + 1, fileArr.length)
      .join(sep);

    return [sep, filePath].join("");
  });

import glob from "glob";

export const getAllPublicImagePaths = (): string[] =>
  glob.sync("./public/assets/image/*.{jpg,png}").map((file) => {
    const sep = "/";
    const fileArr = file.split(sep);

    const filePath = fileArr
      .slice(fileArr.indexOf("public") + 1, fileArr.length)
      .join(sep);

    return [sep, filePath].join("");
  });

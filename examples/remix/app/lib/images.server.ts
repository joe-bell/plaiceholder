import path from "path";
import glob from "glob";

export const getAllUnsplashImagePaths = (): string[] =>
  glob
    .sync(
      // See https://github.com/remix-run/remix/discussions/4074
      path.join(__dirname, "../public/assets/images/unsplash/*.{jpg,png}")
    )
    .map((file) => {
      const sep = "/";
      const fileArr = file.split(sep);

      const filePath = fileArr
        .slice(fileArr.indexOf("public") + 1, fileArr.length)
        .join(sep);

      return [sep, filePath].join("");
    });

console.log(
  0,
  glob.sync(path.join(__dirname, "/public/assets/images/unsplash/*.{jpg,png}"))
);

console.log(
  1,
  glob.sync(
    path.join(__dirname, "../public/assets/images/unsplash/*.{jpg,png}")
  )
);
console.log(
  2,
  glob.sync(
    path.join(__dirname, "../../public/assets/images/unsplash/*.{jpg,png}")
  )
);
console.log(
  3,
  glob.sync(
    path.join(__dirname, "../../../public/assets/images/unsplash/*.{jpg,png}")
  )
);

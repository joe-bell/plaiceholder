module.exports = {
  "*.json": (filenames) => {
    const hasPackageJson = filenames.some((filename) =>
      filename.includes("package.json")
    );

    return hasPackageJson ? ["yarn syncpack format"] : [];
  },
  "*.{ts,tsx,jsx,jsx,json,html,css,md,mdx,yml}": (filenames) =>
    filenames.map((filename) => `yarn prettier --write '${filename}'`),
  "*.ts?(x)": () => ["yarn lint:ts"],
};

export default {
  "*.json": (filenames) => {
    const hasPackageJson = filenames.some((filename) =>
      filename.includes("package.json")
    );

    return hasPackageJson ? ["pnpx syncpack format"] : [];
  },
  "*.{ts,tsx,jsx,jsx,json,html,css,md,mdx,yml}": (filenames) =>
    filenames.map((filename) => `pnpx prettier --write '${filename}'`),
  "*.ts?(x)": () => ["pnpm check"],
};

module.exports = {
  "*.{ts,tsx,jsx,jsx,json,html,css,md,mdx,yml}": (filenames) =>
    filenames.map((filename) => `yarn format --write '${filename}'`),
  "*.ts?(x)": () => ["yarn lint"],
};

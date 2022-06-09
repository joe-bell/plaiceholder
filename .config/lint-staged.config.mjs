export default {
  "*": (filenames) =>
    `pnpm format:prettier -- ${filenames
      .map((filename) => `'${filename}'`)
      .join(" ")}`,
  "**/package.json": (filenames) => [
    "pnpm lint:packages",
    `pnpm format:packages -- ${filenames
      .map((filename) => `--source '${filename}'`)
      .join(" ")}`,
  ],
  "*.ts?(x)": () => ["pnpm lint:ts"],
};

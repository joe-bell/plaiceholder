import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
});

/**
 * Static export for Cloudflare Workers static assets.
 * The `/` → `/docs` redirect lives in `public/_redirects`.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default withNextra(nextConfig);

// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * Static export for Cloudflare Workers static assets.
 *
 * @type {import('next').NextConfig}
 */
const config = {
  output: "export",
  transpilePackages: ["@plaiceholder/ui"],
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
};

export default withPlaiceholder(config);

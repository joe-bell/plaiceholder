// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  experimental: {
    esmExternals: "loose",
  },
  transpilePackages: ["@plaiceholder/ui"],
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withPlaiceholder(config);

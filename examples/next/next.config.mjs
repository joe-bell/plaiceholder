// @ts-check
import withPlaiceholder from "@plaiceholder/next";

/**
 * @type {import('next').NextConfig}
 */
const config = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

export default withPlaiceholder(config);

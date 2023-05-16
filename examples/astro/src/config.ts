export const config = {
  title: "Plaiceholder × Astro",
  domain: "https://plaiceholder.co",
  social: {
    github: "https://github.com/joe-bell/plaiceholder/tree/main/examples/astro",
    twitter: "https://twitter.com/joebell_",
  },
  examples: {
    variants: {
      single: { title: "Single" },
      multiple: { title: "Multiple" },
    },
    pages: {
      tailwind: {
        title: "Tailwind",
      },
      css: {
        title: "CSS",
      },
      svg: {
        title: "SVG",
      },
      base64: {
        title: "Base64",
      },
      color: {
        title: "Color",
      },
    },
  },
} as const;

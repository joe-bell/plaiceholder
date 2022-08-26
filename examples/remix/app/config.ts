export const config = {
  title: "Plaiceholder × Remix",
  domain: "https://plaiceholder.co",
  social: {
    github: "https://github.com/joe-bell/plaiceholder/tree/main/examples/remix",
    twitter: "https://twitter.com/joebell_",
  },
  examples: {
    variants: {
      single: {
        title: "Single",
        unsplash:
          "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
      },
      multiple: {
        title: "Multiple",
        unsplash: [
          "https://images.unsplash.com/photo-1611614728551-63d73ba10dba?auto=format&fit=crop&w=1287&q=80",
          "https://images.unsplash.com/photo-1617055669577-64245d59b81a?auto=format&fit=crop&w=1287&q=80",
          "https://images.unsplash.com/photo-1601671305216-84b52af163e2?auto=format&fit=crop&w=1287&q=80",
          "https://images.unsplash.com/photo-1612795345437-fdc58fc833f4?auto=format&fit=crop&w=1287&q=80",
          "https://images.unsplash.com/photo-1615866431878-500cc9e74d82?auto=format&fit=crop&w=1287&q=80",
          "https://images.unsplash.com/photo-1656971483845-342e16896d38?auto=format&fit=crop&w=1287&q=80",
        ],
      },
    },
    pages: {
      css: {
        title: "CSS",
      },
      svg: {
        title: "SVG",
      },
      base64: {
        title: "Base64",
      },
      blurhash: {
        title: "Blurhash",
      },
    },
  },
} as const;

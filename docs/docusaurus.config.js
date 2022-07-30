// @ts-check

const path = require("path");
const { withUrl } = require("./src/utils");

const title = "Plaiceholder: Docs";
const github = "https://github.com/joe-bell/plaiceholder";

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title,
  tagline: "Beautiful image placeholders, without the hassle.",
  url: withUrl(),
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "assets/img/favicon@192px.png",
  organizationName: "joe-bell",
  projectName: "plaiceholder",
  themeConfig: {
    algolia: {
      appId: "3TA0CXE0R3",
      apiKey: "bf663ef0d2d7e3bc4c32fe8c83f29f92",
      indexName: "plaiceholder",
      contextualSearch: true,
    },
    metaTags: [{ name: "data-title", content: title }],
    navbar: {
      title: "Plaiceholder",
      logo: {
        href: "/",
        alt: "Plaice Fish",
        src: "assets/img/logo-light.png",
        srcDark: "assets/img/logo-dark.png",
      },
      items: [
        { to: "/", label: "Docs", position: "left" },
        {
          href: github,
          position: "right",
          label: "GitHub",
          className: "navbar__github-link",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Learn",
          items: [
            {
              label: "Introduction",
              to: "/",
            },
            {
              label: "Usage",
              to: "/usage",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: github,
            },
            {
              label: "Twitter",
              href: "https://twitter.com/joebell_",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Joe Bell`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: path.join(github, "/edit/main/docs/"),
          path: "docs",
          routeBasePath: "/",
          remarkPlugins: [
            [require("@docusaurus/remark-plugin-npm2yarn"), { sync: true }],
          ],
        },
        pages: {
          remarkPlugins: [require("@docusaurus/remark-plugin-npm2yarn")],
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};

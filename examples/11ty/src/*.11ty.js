const { getPlaiceholder } = require("plaiceholder");

const { propsToString, stylesToString } = require("./lib");

class Page {
  async data() {
    const { base64, css, svg, img } = await getPlaiceholder(
      "/assets/keila-joa@578.jpg"
    );

    const [pixelsSVGElem, pixelsSVGPropsAll, pixelsSVGChildren] = svg;

    const { style: pixelsSVGStyle, ...pixelsSVGProps } = pixelsSVGPropsAll;

    return {
      pagination: {
        data: "paths",
        size: 1,
        alias: "path",
      },
      paths: [
        {
          slug: "index",
          title: "Plaiceholder: 11ty",
        },
        {
          slug: "with-base64",
          template: "example",
          title: "With Base64",
          img,
          base64,
        },
        {
          slug: "with-pixels-css",
          template: "example",
          title: "With Pixels (CSS)",
          img,
          css,
        },
        {
          slug: "with-pixels-svg",
          template: "example",
          title: "With Pixels (SVG)",
          img,
          svg: {
            element: pixelsSVGElem,
            style: pixelsSVGStyle,
            props: pixelsSVGProps,
            children: pixelsSVGChildren,
          },
        },
      ],
      permalink: ({ path }) =>
        `${path.slug === "index" ? "" : path.slug}/index.html`,
      layout: "base",
    };
  }

  async render({
    pagination,
    path: { base64, img, css, svg, slug, template, title },
  }) {
    const children = {
      index: `<h2 class="c-heading c-heading--secondary u-margin-top">Examples</h2>
      <ul class="c-menu u-margin-top">
        ${pagination.pages
          .map(
            (p) =>
              p.slug !== "index" &&
              `<li><a href="${p.slug}" class="c-menu__link">${p.title}</a></li>`
          )
          .filter((p) => p !== false)
          .join("\n        ")}
      </ul>`,

      "with-base64":
        base64 &&
        `<img class="c-placeholder c-placeholder--base64" alt="" src="${base64}" />`,

      "with-pixels-css":
        css &&
        `<div class="c-placeholder" style="${stylesToString(css)}"></div>`,

      "with-pixels-svg":
        svg &&
        `<${
          svg.element
        } class="c-placeholder c-placeholder--svg" style="${stylesToString(
          svg.style
        )}" ${propsToString(svg.props)} >
            ${svg.children
              .map(
                ([childElem, childProps]) =>
                  `<${childElem} ${propsToString(childProps)} />`
              )
              .join("")}
          </${svg.element}>`,
    }[slug];

    return { children, img, template, title };
  }
}

module.exports = Page;

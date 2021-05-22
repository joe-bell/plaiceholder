const { getBase64, getPixelsCSS, getPixelsSVG } = require("plaiceholder");

const { getImage, propsToString, stylesToString } = require("./lib");

class Page {
  async data() {
    const src = "/keila-joa@578.jpg";
    const img = await getImage(src);
    const base64 = await getBase64(img);
    const pixelsCSS = await getPixelsCSS(img);
    const [
      pixelsSVGElem,
      pixelsSVGPropsAll,
      pixelsSVGChildren,
    ] = await getPixelsSVG(img);

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
          base64,
        },
        {
          slug: "with-pixels-css",
          template: "example",
          title: "With Pixels (CSS)",
          pixelsCSS,
        },
        {
          slug: "with-pixels-svg",
          template: "example",
          title: "With Pixels (SVG)",
          pixelsSVG: {
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
    path: { base64, pixelsCSS, pixelsSVG, slug, template, title },
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
        pixelsCSS &&
        `<div class="c-placeholder" style="${stylesToString(
          pixelsCSS
        )}"></div>`,

      "with-pixels-svg":
        pixelsSVG &&
        `<${
          pixelsSVG.element
        } class="c-placeholder c-placeholder--svg" style="${stylesToString(
          pixelsSVG.style
        )}" ${propsToString(pixelsSVG.props)} >
            ${pixelsSVG.children
              .map(
                ([childElem, childProps]) =>
                  `<${childElem} ${propsToString(childProps)} />`
              )
              .join("")}
          </${pixelsSVG.element}>`,
    }[slug];

    return { children, template, title };
  }
}

module.exports = Page;

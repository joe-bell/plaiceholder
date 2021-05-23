const { getBase64, getCSS, getSVG, getImage } = require("plaiceholder");

const { propsToString, stylesToString } = require("./lib");

class Page {
  async data() {
    const src = "/assets/keila-joa@578.jpg";

    const { buffer, ...imgDetails } = await getImage(src);
    const base64 = await getBase64(buffer);
    const pixelsCSS = await getCSS(buffer);
    const [pixelsSVGElem, pixelsSVGPropsAll, pixelsSVGChildren] = await getSVG(
      buffer
    );

    const { style: pixelsSVGStyle, ...pixelsSVGProps } = pixelsSVGPropsAll;

    const img = { src, ...imgDetails };

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
          pixelsCSS,
        },
        {
          slug: "with-pixels-svg",
          template: "example",
          title: "With Pixels (SVG)",
          img,
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
    path: { base64, img, pixelsCSS, pixelsSVG, slug, template, title },
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

    return { children, img, template, title };
  }
}

module.exports = Page;

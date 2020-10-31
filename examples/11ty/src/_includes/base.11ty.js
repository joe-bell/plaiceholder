const { getStyles } = require("../lib");

exports.data = {
  title: "Plaiceholder × 11ty",
  description: "Using Plaiceholder in 11ty",
};

exports.render = function (data) {
  return `<!DOCTYPE html>
<html class="no-js" lang="en-GB">
  <head>
    <meta charset="utf-8" />
    <title>${data.content.title || data.title}</title>
    <meta name="description" content="${
      data.content.description || data.description
    }" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${getStyles()}</style>
  </head>
  <body>
    <main class="c-main u-margin-top">
      <h1 class="c-heading c-heading--primary">${
        data.content.title || data.title
      }</h1>
      ${
        data.content && data.content.template === "example"
          ? `<a href="https://instagram.com/joebell" title="© Joe Bell" class="c-link-img u-margin-top">
      ${data.content.children}
      <div style="max-width:100%;width:4032px">
        <div style="position:relative;padding-bottom:75%">
          <img alt="Keila Joa, Estonia." src="/assets/keila-joa@576px.jpg" style="color: transparent; visibility: visible; height: 100%; left: 0px; position: absolute; top: 0px; width: 100%;"/>
        </div>
      </div>
    </a>`
          : data.content.children
      }
    </main>
  </body>
</html>`;
};

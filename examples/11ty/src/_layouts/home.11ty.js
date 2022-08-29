const {
  article,
  articleContent,
  articleHeader,
  articleHeaderSubtitle,
  articleHeaderTitle,
} = require("../_modules/@plaiceholder/ui");

module.exports.data = {
  layout: "root",
};

exports.render = function (data) {
  return `
  <article class="${article()}">
    <header class="${articleHeader()}">
      <h1 class="${articleHeaderTitle({ size: "alpha" })}">${data.title}</h1>
      <p class="${articleHeaderSubtitle()}">
        ${data.subTitle}
      </p>
    </header>
    <div class="${articleContent()}">
      ${data.content}
    </div>
  </article>`;
};

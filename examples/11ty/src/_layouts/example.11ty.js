const {
  article,
  articleContent,
  articleHeader,
  articleHeaderSubtitle,
  articleHeaderTitle,
  backBar,
  backBarLink,
  icon,
} = require("../_modules/@plaiceholder/ui");

module.exports.data = {
  layout: "root",
};

exports.render = function (data) {
  return `
    <article class="${article()}">
      <header class="${articleHeader()}">
        <h1 class="${articleHeaderTitle({ size: "beta" })}">${data.title}</h1>
        <h2 class="${articleHeaderSubtitle()}">
          ${data.subTitle}
        </h2>
      </header>
      <div class="${articleContent()}">
        ${data.content}
      </div>
      <nav class="${backBar()}">
        <a class="${backBarLink()}" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="${icon({ size: 4 })}"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Examples
          </a>
      </nav>
    </article>`;
};

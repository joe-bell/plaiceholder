const { getPlaiceholder } = require("plaiceholder");
const {
  exampleBody,
  exampleLink,
  exampleList,
  exampleListItem,
  exampleLQIP,
  exampleNav,
  exampleNavItem,
  exampleTitle,
} = require("../_modules/@plaiceholder/ui");
const { stylesToString } = require("../_lib/to-string");

class IndexPage {
  async data() {
    return {
      title: "11ty",
      subTitle: "Choose-your-own adventure",
      layout: "home",
      permalink: "/index.html",
    };
  }

  async render(data) {
    const plaiceholders = await Promise.all(
      data.assets.unsplash.map((src) => getPlaiceholder(src))
    )
      .then((values) => values.map(({ css }) => css))
      .catch((err) => {
        throw err;
      });

    const pages = data.collections.pages
      .map(({ url, data }) => ({ ...data, url }))
      .filter((page) => page.url !== "/");

    const sortAlphabetically = (obj, options = { reverse: false }) => {
      const entries = Object.entries(obj).sort();

      return Object.fromEntries(options.reverse ? entries.reverse() : entries);
    };

    const examples = pages.reduce((acc, cv) => {
      const [section, page] = cv.url.split("/").filter(Boolean);

      return sortAlphabetically({
        ...acc,
        // Order by "Single", then "Multiple"
        [section]: sortAlphabetically(
          {
            ...acc[section],
            [page]: cv,
          },
          { reverse: true }
        ),
      });
    }, {});

    return `
      <ul class="${exampleList()}">
        ${Object.keys(examples)
          .map((exampleKey, i) => {
            const example = examples[exampleKey];
            const heading = example[Object.keys(example)[0]].title;

            return `
            <li class="${exampleListItem()}">
              <div
                aria-hidden="true"
                class="${exampleLQIP()}"
                style="${stylesToString(plaiceholders[i])}"
              ></div>

              <p class="${exampleBody()}">
                <span class="${exampleTitle()}">
                  ${heading}
                </span>
              </p>
              <ul role="list" class="${exampleNav()}">
                ${Object.keys(example)
                  .map(
                    (variant) => `
                      <li class="${exampleNavItem()}">
                        <a
                          href="${example[variant].url}"
                          class="${exampleLink()}"
                        >
                          ${variant}
                        </a>
                      </li>`
                  )
                  .join("")}
              </ul>
            </li>`;
          })
          .join("")}
      </ul>
    `;
  }
}

module.exports = IndexPage;

const { getPlaiceholder } = require("plaiceholder");
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
      <ul class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-stretch text-center">
        ${Object.keys(examples)
          .map((exampleKey, i) => {
            const example = examples[exampleKey];
            const heading = example[Object.keys(example)[0]].title;

            return `
            <li class="group rounded-md border border-gray-200 shadow-sm grid rounded-lg relative overflow-hidden w-full h-full">
              <div 
                class="absolute inset-0 w-full h-full filter blur-xl transform scale-150"
                style="${stylesToString(plaiceholders[i])}"
              ></div>

              <p class="relative flex aspect-[16/9] items-end">
                <span class="absolute bottom-0 px-4 text-white font-bold text-2xl top-auto h-[unset] flex-1 text-left">
                  ${heading}
                </span>
              </p>
              <ul class="grid grid-cols-2 gap-4 p-4 z-10">
                ${Object.keys(example)
                  .map(
                    (variant) => `
                      <li>
                        <a
                          href="${example[variant].url}"
                          class="block appearance-none px-4 py-2 text-gray-700 font-medium text-sm bg-white bg-opacity-80 hover:bg-opacity-100 focus:bg-opacity-100 hover:text-gray-800 focus:text-gray-800 rounded-md capitalize shadow-sm transition-colors duration-200 outline-none focus:ring"
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

const { getPlaiceholder } = require("plaiceholder");

class CSSSinglePage {
  async data() {
    const { css } = await getPlaiceholder("/assets/keila-joa@578.jpg");

    return {
      layout: "root",
      permalink: "/css/single/index.html",
    };
  }

  async render(data) {
    return `
      <h1 class="font-bold text-4xl mt-10">${data.config.pages.index.heading}</h1>
      <p class="font-light text-gray-600 text-2xl mt-2">${data.config.pages.index.subHeading}</p>

      <div>Grid</div>
    `;
  }
}

module.exports = CSSSinglePage;

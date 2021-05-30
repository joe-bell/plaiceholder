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
      <h1 class="font-bold text-4xl mt-10">${
        data.config.pages.index.heading
      }</h1>
      <p class="font-light text-gray-600 text-2xl mt-2">${
        data.config.pages.index.subHeading
      }</p>

      ${await this.imageWithPlaiceholderCSS(
        "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
        "Mountains",
        "(min-width: 30em) 50vw, 100vw"
      )}

      <div>Grid</div>
    `;
  }
}

module.exports = CSSSinglePage;

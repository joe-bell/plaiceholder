const { getPlaiceholder } = require("plaiceholder");

class IndexPage {
  async data() {
    const { css } = await getPlaiceholder("/assets/keila-joa@578.jpg");

    return {
      heading: "11ty",
      layout: "home",
      permalink: "/index.html",
    };
  }
}

module.exports = IndexPage;

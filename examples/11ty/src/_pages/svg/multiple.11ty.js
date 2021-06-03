class SVGMultiplePage {
  async data() {
    return {
      title: "SVG",
      subTitle: "Multiple",
      layout: "example",
      permalink: "/svg/multiple/index.html",
    };
  }

  async render(data) {
    const images = await Promise.all(
      data.assets.unsplash.map((src) =>
        this.imageWithPlaiceholderSVG(src, "", "(min-width: 30em) 50vw, 100vw")
      )
    )
      .then((values) => values)
      .catch((err) => {
        throw err;
      });

    return this.imageGrid(images);
  }
}

module.exports = SVGMultiplePage;

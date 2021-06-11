class CSSMultiplePage {
  async data() {
    return {
      title: "CSS",
      subTitle: "Multiple",
      layout: "example",
      permalink: "/css/multiple/index.html",
    };
  }

  async render(data) {
    const images = await Promise.all(
      data.assets.unsplash.map((src) =>
        this.imageWithPlaiceholderCSS(src, "", "(min-width: 30em) 50vw, 100vw")
      )
    )
      .then((values) => values)
      .catch((err) => {
        throw err;
      });

    return this.imageGrid(images);
  }
}

module.exports = CSSMultiplePage;

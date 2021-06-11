class Base64MultiplePage {
  async data() {
    return {
      title: "Base64",
      subTitle: "Multiple",
      layout: "example",
      permalink: "/base64/multiple/index.html",
    };
  }

  async render(data) {
    const images = await Promise.all(
      data.assets.unsplash.map((src) =>
        this.imageWithPlaiceholderBase64(
          src,
          "",
          "(min-width: 30em) 50vw, 100vw"
        )
      )
    )
      .then((values) => values)
      .catch((err) => {
        throw err;
      });

    return this.imageGrid(images);
  }
}

module.exports = Base64MultiplePage;

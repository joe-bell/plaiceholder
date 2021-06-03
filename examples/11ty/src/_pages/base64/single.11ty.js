class Base64SinglePage {
  async data() {
    return {
      title: "Base64",
      subTitle: "Single",
      layout: "example",
      permalink: "/base64/single/index.html",
    };
  }

  async render() {
    const image = await this.imageWithPlaiceholderBase64(
      "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
      "Mountains",
      "(min-width: 30em) 50vw, 100vw"
    );

    return this.imageGrid(image);
  }
}

module.exports = Base64SinglePage;

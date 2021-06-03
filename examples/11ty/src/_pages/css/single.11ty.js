class CSSSinglePage {
  async data() {
    return {
      title: "CSS",
      subTitle: "Single",
      layout: "example",
      permalink: "/css/single/index.html",
    };
  }

  async render() {
    const image = await this.imageWithPlaiceholderCSS(
      "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
      "Mountains",
      "(min-width: 30em) 50vw, 100vw"
    );

    return this.imageGrid(image);
  }
}

module.exports = CSSSinglePage;

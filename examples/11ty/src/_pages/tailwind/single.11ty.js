const { extractImgSrc } = require("@plaiceholder/tailwindcss/utils");

class TailwindSinglePage {
  async data() {
    return {
      title: "Tailwind",
      subTitle: "Single",
      layout: "example",
      permalink: "/tailwind/single/index.html",
    };
  }

  async render() {
    const plaiceholder = "plaiceholder-[/assets/keila-joa@578.jpg]";
    const imgSrc = extractImgSrc(plaiceholder);

    const image = await this.image(
      imgSrc,
      "Mountains",
      "(min-width: 30em) 50vw, 100vw"
    );

    return this.imageGrid(
      [
        `<div class="z-[-1] absolute inset-0 transform scale-150 filter blur-2xl w-full h-full ${plaiceholder}"></div>`,
        image,
      ].join("")
    );
  }
}

module.exports = TailwindSinglePage;

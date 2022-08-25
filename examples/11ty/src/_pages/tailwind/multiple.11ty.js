const { extractImgSrc } = require("@plaiceholder/tailwindcss/utils");

class TailwindMultiplePage {
  async data() {
    return {
      title: "Tailwind",
      subTitle: "Multiple",
      layout: "example",
      permalink: "/tailwind/multiple/index.html",
    };
  }

  async render(data) {
    const images = await Promise.all(
      [
        "plaiceholder-[/assets/images/unsplash/alexander-ant-oR7HxvOe2YE.jpg]",
        "plaiceholder-[/assets/images/unsplash/alexander-ant-r7xdS9hjYYE.jpg]",
        "plaiceholder-[/assets/images/unsplash/solen-feyissa-0KXl7T2YU0I.jpg]",
        "plaiceholder-[/assets/images/unsplash/solen-feyissa-ju3ZBdiXzmA.jpg]",
        "plaiceholder-[/assets/images/unsplash/solen-feyissa-tek55norwaQ.jpg]",
        "plaiceholder-[/assets/images/unsplash/solen-feyissa-WX1siNmyR4.jpg]",
      ].map(async (plaiceholder) => {
        const image = await this.image(
          extractImgSrc(plaiceholder),
          "",
          "(min-width: 30em) 50vw, 100vw"
        );

        return {
          plaiceholder,
          image,
        };
      })
    )
      .then((values) => values)
      .catch((err) => {
        throw err;
      });

    return this.imageGrid(
      images.map(({ plaiceholder, image }) =>
        [
          `<div class="z-[-1] absolute inset-0 transform scale-150 filter blur-2xl w-full h-full ${plaiceholder}"></div>`,
          image,
        ].join("")
      )
    );
  }
}

module.exports = TailwindMultiplePage;

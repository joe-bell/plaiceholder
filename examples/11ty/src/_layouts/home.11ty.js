module.exports.data = {
  layout: "root",
};

exports.render = function (data) {
  // const pages = data.collections.pages.filter((page) => page.url !== "/");

  return `
  <article class="max-w-sm sm:max-w-none mx-auto">
    <h1 class="font-bold text-4xl mt-10">${data.title}</h1>
    <p class="font-light text-gray-600 text-2xl mt-2 mb-8">
      ${data.subTitle}
    </p>
    ${data.content}
  </article>`;
};

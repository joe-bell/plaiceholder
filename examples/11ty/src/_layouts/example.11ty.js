module.exports.data = {
  layout: "root",
};

exports.render = function (data) {
  return `
    <article>
      <h1 class="font-bold text-3xl mt-10">${data.title}</h1>
      <h2 class="font-light text-gray-600 text-2xl mt-2 mb-8">${data.subTitle}</h2>
      ${data.content}
      <nav class="mt-10 py-4 border-t">
        <a
          class="
            inline-flex
            items-center
            text-gray-500
            hover:text-gray-900
            transition-colors
            duration-200
          "
          href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Examples
          </a>
      </nav>
    </article>`;
};

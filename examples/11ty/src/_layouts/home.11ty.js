module.exports.data = {
  layout: "root",
};

exports.render = function (data) {
  const pages = data.collections.pages.filter((page) => page.url !== "/");

  return `
  <ul class="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 place-content-stretch text-center">
    ${pages
      .map(
        (page) =>
          `<li class="group rounded-md border border-gray-200 shadow-sm grid flex-col rounded-lg relative overflow-hidden w-full h-full">
            <div class="absolute inset-0 w-full h-full filter blur-xl transform scale-150" />
            <p class="relative flex aspect-w-16 aspect-h-9 items-end">
              <span class="absolute bottom-0 px-4 text-white font-bold text-2xl top-auto h-[unset] flex-1 text-left">
                ${page.url}
              </span>
            </p>
            <ul class="grid grid-cols-2 gap-4 p-4 z-10">
              <li>
                <a
                  class="block appearance-none px-4 py-2 text-gray-700 font-medium text-sm bg-white bg-opacity-80 hover:bg-opacity-100 focus:bg-opacity-100 hover:text-gray-800 focus:text-gray-800 rounded-md capitalize shadow-sm transition-colors duration-200 outline-none focus:ring"
                  href="/tailwind/single"
                >
                  Single
                </a>
              </li>
              <li>
                <a
                  class="block appearance-none px-4 py-2 text-gray-700 font-medium text-sm bg-white bg-opacity-80 hover:bg-opacity-100 focus:bg-opacity-100 hover:text-gray-800 focus:text-gray-800 rounded-md capitalize shadow-sm transition-colors duration-200 outline-none focus:ring"
                  href="/tailwind/single"
                >
                  Double
                </a>
              </li>
            </ul>
          </li>`
      )
      .join("\n")}
  </ul>
  <ul
    class="
      mt-8
      grid
      sm:grid-cols-2
      md:grid-cols-3
      gap-4
      place-content-stretch
      text-center
    "
  >
    <li
      class="
        group
        rounded-md
        border border-gray-200
        shadow-sm
        grid
        flex-col
        rounded-lg
        relative
        overflow-hidden
        w-full
        h-full
      "
    >
      <div
        class="absolute inset-0 w-full h-full filter blur-xl transform scale-150"
        style="
          background-image: linear-gradient(
              90deg,
              rgb(36, 120, 194) 33.33333333333333%,
              rgb(55, 185, 245) 33.33333333333333% 66.66666666666666%,
              rgb(113, 120, 165) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(116, 96, 153) 33.33333333333333%,
              rgb(164, 117, 170) 33.33333333333333% 66.66666666666666%,
              rgb(144, 118, 161) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(117, 37, 106) 33.33333333333333%,
              rgb(176, 33, 134) 33.33333333333333% 66.66666666666666%,
              rgb(233, 37, 128) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(140, 10, 70) 33.33333333333333%,
              rgb(194, 19, 71) 33.33333333333333% 66.66666666666666%,
              rgb(210, 39, 129) 66.66666666666666% 100%
            );
          background-position: 0 0, 0 33.33333333333333%, 0 66.66666666666666%,
            0 100%;
          background-size: 100% 25%;
          background-repeat: no-repeat;
        "
      ></div>
      <p class="relative flex aspect-w-16 aspect-h-9 items-end">
        <span
          class="
            absolute
            bottom-0
            px-4
            text-white
            font-bold
            text-2xl
            top-auto
            h-[unset]
            flex-1
            text-left
          "
          >Tailwind</span
        >
      </p>
      <ul class="grid grid-cols-2 gap-4 p-4 z-10">
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/tailwind/single"
            >Single</a
          >
        </li>
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/tailwind/multiple"
            >Multiple</a
          >
        </li>
      </ul>
    </li>
    <li
      class="
        group
        rounded-md
        border border-gray-200
        shadow-sm
        grid
        flex-col
        rounded-lg
        relative
        overflow-hidden
        w-full
        h-full
      "
    >
      <div
        class="absolute inset-0 w-full h-full filter blur-xl transform scale-150"
        style="
          background-image: linear-gradient(
              90deg,
              rgb(40, 63, 160) 33.33333333333333%,
              rgb(159, 99, 90) 33.33333333333333% 66.66666666666666%,
              rgb(228, 159, 4) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(118, 114, 130) 33.33333333333333%,
              rgb(87, 105, 171) 33.33333333333333% 66.66666666666666%,
              rgb(217, 126, 33) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(218, 168, 55) 33.33333333333333%,
              rgb(31, 71, 170) 33.33333333333333% 66.66666666666666%,
              rgb(156, 95, 68) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(255, 151, 18) 33.33333333333333%,
              rgb(138, 43, 60) 33.33333333333333% 66.66666666666666%,
              rgb(114, 50, 48) 66.66666666666666% 100%
            );
          background-position: 0 0, 0 33.33333333333333%, 0 66.66666666666666%,
            0 100%;
          background-size: 100% 25%;
          background-repeat: no-repeat;
        "
      ></div>
      <p class="relative flex aspect-w-16 aspect-h-9 items-end">
        <span
          class="
            absolute
            bottom-0
            px-4
            text-white
            font-bold
            text-2xl
            top-auto
            h-[unset]
            flex-1
            text-left
          "
          >CSS</span
        >
      </p>
      <ul class="grid grid-cols-2 gap-4 p-4 z-10">
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/css/single"
            >Single</a
          >
        </li>
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/css/multiple"
            >Multiple</a
          >
        </li>
      </ul>
    </li>
    <li
      class="
        group
        rounded-md
        border border-gray-200
        shadow-sm
        grid
        flex-col
        rounded-lg
        relative
        overflow-hidden
        w-full
        h-full
      "
    >
      <div
        class="absolute inset-0 w-full h-full filter blur-xl transform scale-150"
        style="
          background-image: linear-gradient(
              90deg,
              rgb(127, 29, 65) 33.33333333333333%,
              rgb(156, 43, 108) 33.33333333333333% 66.66666666666666%,
              rgb(149, 12, 106) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(143, 38, 78) 33.33333333333333%,
              rgb(172, 55, 112) 33.33333333333333% 66.66666666666666%,
              rgb(165, 43, 118) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(153, 44, 62) 33.33333333333333%,
              rgb(180, 51, 99) 33.33333333333333% 66.66666666666666%,
              rgb(174, 72, 128) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(118, 31, 47) 33.33333333333333%,
              rgb(143, 25, 86) 33.33333333333333% 66.66666666666666%,
              rgb(175, 56, 109) 66.66666666666666% 100%
            );
          background-position: 0 0, 0 33.33333333333333%, 0 66.66666666666666%,
            0 100%;
          background-size: 100% 25%;
          background-repeat: no-repeat;
        "
      ></div>
      <p class="relative flex aspect-w-16 aspect-h-9 items-end">
        <span
          class="
            absolute
            bottom-0
            px-4
            text-white
            font-bold
            text-2xl
            top-auto
            h-[unset]
            flex-1
            text-left
          "
          >SVG</span
        >
      </p>
      <ul class="grid grid-cols-2 gap-4 p-4 z-10">
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/svg/single"
            >Single</a
          >
        </li>
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/svg/multiple"
            >Multiple</a
          >
        </li>
      </ul>
    </li>
    <li
      class="
        group
        rounded-md
        border border-gray-200
        shadow-sm
        grid
        flex-col
        rounded-lg
        relative
        overflow-hidden
        w-full
        h-full
      "
    >
      <div
        class="absolute inset-0 w-full h-full filter blur-xl transform scale-150"
        style="
          background-image: linear-gradient(
              90deg,
              rgb(30, 117, 53) 33.33333333333333%,
              rgb(25, 140, 67) 33.33333333333333% 66.66666666666666%,
              rgb(43, 176, 86) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(30, 121, 60) 33.33333333333333%,
              rgb(12, 42, 24) 33.33333333333333% 66.66666666666666%,
              rgb(16, 63, 31) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(34, 116, 57) 33.33333333333333%,
              rgb(11, 38, 26) 33.33333333333333% 66.66666666666666%,
              rgb(13, 38, 25) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(29, 86, 37) 33.33333333333333%,
              rgb(15, 28, 25) 33.33333333333333% 66.66666666666666%,
              rgb(10, 26, 21) 66.66666666666666% 100%
            );
          background-position: 0 0, 0 33.33333333333333%, 0 66.66666666666666%,
            0 100%;
          background-size: 100% 25%;
          background-repeat: no-repeat;
        "
      ></div>
      <p class="relative flex aspect-w-16 aspect-h-9 items-end">
        <span
          class="
            absolute
            bottom-0
            px-4
            text-white
            font-bold
            text-2xl
            top-auto
            h-[unset]
            flex-1
            text-left
          "
          >Base64</span
        >
      </p>
      <ul class="grid grid-cols-2 gap-4 p-4 z-10">
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/base64/single"
            >Single</a
          >
        </li>
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/base64/multiple"
            >Multiple</a
          >
        </li>
      </ul>
    </li>
    <li
      class="
        group
        rounded-md
        border border-gray-200
        shadow-sm
        grid
        flex-col
        rounded-lg
        relative
        overflow-hidden
        w-full
        h-full
      "
    >
      <div
        class="absolute inset-0 w-full h-full filter blur-xl transform scale-150"
        style="
          background-image: linear-gradient(
              90deg,
              rgb(181, 159, 176) 33.33333333333333%,
              rgb(237, 158, 173) 33.33333333333333% 66.66666666666666%,
              rgb(157, 110, 125) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(221, 130, 141) 33.33333333333333%,
              rgb(160, 116, 140) 33.33333333333333% 66.66666666666666%,
              rgb(51, 111, 125) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(158, 103, 109) 33.33333333333333%,
              rgb(46, 103, 113) 33.33333333333333% 66.66666666666666%,
              rgb(0, 105, 114) 66.66666666666666% 100%
            ),
            linear-gradient(
              90deg,
              rgb(62, 110, 102) 33.33333333333333%,
              rgb(27, 138, 113) 33.33333333333333% 66.66666666666666%,
              rgb(0, 167, 114) 66.66666666666666% 100%
            );
          background-position: 0 0, 0 33.33333333333333%, 0 66.66666666666666%,
            0 100%;
          background-size: 100% 25%;
          background-repeat: no-repeat;
        "
      ></div>
      <p class="relative flex aspect-w-16 aspect-h-9 items-end">
        <span
          class="
            absolute
            bottom-0
            px-4
            text-white
            font-bold
            text-2xl
            top-auto
            h-[unset]
            flex-1
            text-left
          "
          >Blurhash</span
        >
      </p>
      <ul class="grid grid-cols-2 gap-4 p-4 z-10">
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/blurhash/single"
            >Single</a
          >
        </li>
        <li>
          <a
            class="
              block
              appearance-none
              px-4
              py-2
              text-gray-700
              font-medium
              text-sm
              bg-white bg-opacity-80
              hover:bg-opacity-100
              focus:bg-opacity-100
              hover:text-gray-800
              focus:text-gray-800
              rounded-md
              capitalize
              shadow-sm
              transition-colors
              duration-200
              outline-none
              focus:ring
            "
            href="/blurhash/multiple"
            >Multiple</a
          >
        </li>
      </ul>
    </li>
  </ul>
`;
};

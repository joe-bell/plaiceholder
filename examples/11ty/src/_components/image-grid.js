/** @param {string|string[]} items */
function imageGrid(items) {
  const children = typeof items === "string" ? [items] : items;

  return `<ul class="grid grid-cols-1 sm:grid-cols-2 ${
    children.length > 2 ? "md:grid-cols-3" : ""
  } gap-4">
    ${children
      .map((item) => `<li class="relative block overflow-hidden">${item}</li>`)
      .join("")}
  </ul>`;
}

module.exports = { imageGrid };

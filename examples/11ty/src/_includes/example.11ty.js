module.exports.data = {
  layout: "root",
};

exports.render = function (data) {
  return `<p>Test ${data.content}</p>`;
};

export const arrayChunk = (arr, size) =>
  arr.length > size
    ? [arr.slice(0, size), ...arrayChunk(arr.slice(size), size)]
    : [arr];

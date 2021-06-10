---
sidebar_position: 2
---

# Strategies

## CSS

Converts a specified image `Buffer` into a low-res placeholder, outputted as a set of `linear-gradient`s (in the form of a JavaScript style object).

**Pros:** Fast `DOMContentLoaded` and `LCP`  
**Cons:** ? (Still figuring out)

For a "blurred" effect, extend the returned styles with `filter: blur(<value>)` and `transform: scale(<value>)`.

### Installation

```sh
npm i @plaiceholder/css
```

### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getPlaiceholder } from "plaiceholder";

const { css } = await getPlaiceholder("/path-to-your-image.jpg");

console.log(css);

// Outputs
// {
//   backgroundImage: "…"
//   backgroundPosition: "…"
//   backgroundSize: "…"
//   backgroundRepeat: "…"
// }
```

## SVG

Converts a specified image `Buffer` into a low-res placeholder, outputted as an SVG.

**Pros:** Fast `DOMContentLoaded` and `LCP`  
**Cons:** ? (Still figuring out)

For a "blurred" effect, extend the returned SVG's styles with `filter: blur(<value>)` and `transform: scale(<value>)`.

:::note

Although it returns the SVG in the format of [`React.createElement()`](https://reactjs.org/docs/react-api.html#createelement) arguments, you are not constrained to using React.js.

e.g. See the 11ty example.

:::

### Installation

```sh
npm i @plaiceholder/svg
```

### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getPlaiceholder } from "plaiceholder";

const { svg } = await getPlaiceholder("/path-to-your-image.jpg");

console.log(svg);

// Outputs
// [
//   "svg",
//   { ...props }
//   [
//     [
//       "rect",
//       { ...childProps }
//     ],
//     ...etc
//   ]
// ]
```

## Base64

Converts a specified image `Buffer` into a low-res image, encoded as Base64 string.

**Pros:** Fast `DOMContentLoaded` and `LCP`  
**Cons:** ? (Still figuring out)

For a "blurred" effect, add `filter: blur(<value>)` and `transform: scale(<value>)` styles to the image.

### Installation

```sh
npm i @plaiceholder/base64
```

### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getPlaiceholder } from "plaiceholder";

const { base64 } = await getPlaiceholder("/path-to-your-image.jpg");

console.log(base64);

// Outputs
// data:image/jpeg;base64,/9j/2wBDAAYEBQY…
```

## Blurhash

Converts a specified image `Buffer` into a low-res image, encoded as Blurhash string accompanied by its width and height

**Pros:** Lightweight, fast `DOMContentLoaded` and `LCP`  
**Cons:** As it uses `canvas`, it's not ideal to use Blurhash for above-the-fold content.

This can be passed into a library such as [react-blurhash](https://github.com/woltapp/react-blurhash).

### Installation

```sh
npm i @plaiceholder/blurhash
```

### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getPlaiceholder } from "plaiceholder";

const { blurhash } = await getPlaiceholder("/path-to-your-image.jpg");

console.log(blurhash);

// Outputs
//  {
//    hash: "U.QSL{%1bdxtR...",
//    height: 32,
//    width: 32
//  }
```

<h1 align="center">
  plaiceholder
</h1>

<p align="center">
  <img alt="Plaice Fish"  src="./.github/assets/logo.jpg" />
</p>

<p align="center">
  <strong>Beautiful image placeholders, without the hassle.</strong>
</p>
<p align="center">
  Choose-your-own adventure, from pure CSS to SVG…
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@plaiceholder/core">
    <img alt="NPM Version" src="https://badgen.net/npm/v/@plaiceholder/core" />
  </a>
  <a href="https://badgen.net/npm/types/@plaiceholder/core">
    <img alt="Types Included" src="https://badgen.net/npm/types/@plaiceholder/core" />
  </a>
  <a href="https://badgen.net/github/license/joe-bell/plaiceholder">
    <img alt="MIT License" src="https://badgen.net/github/license/joe-bell/plaiceholder" />
  </a>
  <a href="https://www.npmjs.com/package/@plaiceholder/core">
    <img alt="NPM Downloads" src="https://badgen.net/npm/dm/@plaiceholder/core" />
  </a>
</p>

---

<h2 align="center">
  Sponsors
</h2>

<p align="center">
  <strong>
    <a href="https://plaiceholder.co">
      Become a project sponsor 
    </a> 
    to access premium features, including:
  </strong>
</p>

<h3 align="center">
  Plaiceholder Studio
</h3>

<p align="center">
  <img width="300" height="auto" src="./.github/assets/studio.jpg">
</p>

---

## Table of Contents

1. [Introduction](#introduction)
1. [Setup](#setup)
1. [Plugins](#plugins)
   1. [Next.js](#nextjs)
1. [FAQs](#faqs)

### Examples

Jump to the [`examples`](/examples/README.md) directory to see working demos for **Next.js**, **11ty** and more...

---

## Introduction

"Plaiceholder" is a collection of **Node.js** helpers for creating low quality image placeholders, with 4 approaches to choose from:

1.  [**CSS**](#css) <small>(recommended)</small>
2.  [**SVG**](#svg)
3.  [**Base64**](#base64)
4.  [**Blurhash**](#blurhash)

> Disclaimer: It's worth taking pros/cons of each approach with a grain of salt. Although initial tests locally and on [WebPageTest](webpagetest.org/) have proved successful, extra research needs to be completed to determine the fastest solution.

## Setup

### CSS

Converts a specified image `Buffer` into a low-res placeholder, outputted as a set of `linear-gradient`s (in the form of a JavaScript style object).

**Pros:** Fast `DOMContentLoaded` and `LCP`  
**Cons:** ? (Still figuring out)

For a "blurred" effect, extend the returned styles with `filter: blur(<value>)` and `transform: scale(<value>)`.

#### Installation

```sh
npm i @plaiceholder/css
```

#### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getPixelsCSS } from "@plaiceholder/css";

const image = await promisify(fs.readFile)(
  path.join("path", "to", "your", "image.jpg")
);

const css = await getPixelsCSS(image);

console.log(css);

// Outputs
// {
//   backgroundImage: "…"
//   backgroundPosition: "…"
//   backgroundSize: "…"
//   backgroundRepeat: "…"
// }
```

### SVG

Converts a specified image `Buffer` into a low-res placeholder, outputted as an SVG.

**Pros:** Fast `DOMContentLoaded` and `LCP`  
**Cons:** ? (Still figuring out)

For a "blurred" effect, extend the returned SVG's styles with `filter: blur(<value>)` and `transform: scale(<value>)`.

> Although it returns the SVG in the format of [`React.createElement()`](https://reactjs.org/docs/react-api.html#createelement) arguments, you are not constrained to using React.js.
>
> e.g. See the 11ty example.

#### Installation

```sh
npm i @plaiceholder/svg
```

#### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getPixelsSVG } from "@plaiceholder/svg";

const image = await promisify(fs.readFile)(
  path.join("path", "to", "your", "image.jpg")
);

const svg = await getPixelsSVG(image);

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

### Base64

Converts a specified image `Buffer` into a low-res image, encoded as Base64 string.

**Pros:** Fast `DOMContentLoaded` and `LCP`  
**Cons:** ? (Still figuring out)

For a "blurred" effect, add `filter: blur(<value>)` and `transform: scale(<value>)` styles to the image.

#### Installation

```sh
npm i @plaiceholder/base64
```

#### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getBase64 } from "@plaiceholder/base64";

const image = await promisify(fs.readFile)(
  path.join("path", "to", "your", "image.jpg")
);

const base64 = await getBase64(image);

console.log(base64);

// Outputs
// data:image/jpeg;base64,/9j/2wBDAAYEBQY…
```

### Blurhash

Converts a specified image `Buffer` into a low-res image, encoded as Blurhash string accompanied by its width and height

**Pros:** Lightweight, fast `DOMContentLoaded` and `LCP`  
**Cons:** As it uses `canvas`, it's not ideal to use Blurhash for above-the-fold content.

This can be passed into a library such as [react-blurhash][react-blurhash].

#### Installation

```sh
npm i @plaiceholder/blurhash
```

#### Example

```js
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getBlurhash } from "@plaiceholder/blurhash";

const image = await promisify(fs.readFile)(
  path.join("path", "to", "your", "image.jpg")
);

const blurhash = await getBlurhash(image);

console.log(blurhash);

// Outputs
//  {
//    hash: "U.QSL{%1bdxtR...",
//    height: 32,
//    width: 32
//  }
```

## Plugins

### Next.js

A tiny helper function to access `public` files in server-side functions or `getStaticProps()`

#### Installation

```sh
npm i @plaiceholder/next
```

#### Example

In this example, we're going to use the `@plaiceholder/base64` package to create a Base64 string for a single image inside a Next.js [Page](https://nextjs.org/docs/basic-features/pages).

We'll then apply the string to an `<img>` element (hidden from screen-readers) and position underneath our [`Image`][next/image] whilst it's loading.

1. Add your chosen image to the [`public`](https://nextjs.org/docs/basic-features/static-file-serving) directory.

   In this case, our image is `public/keila-joa.jpg`

   > In it's current state, `@plaiceholder/next` only supports [local images](#what-about-remote-images).

2. Create a new page (or add to an existing page), and add the following:

   1. Call `getBase64()` inside `getStaticProps()` with your image's path **without the `public` prefix**. This will return the Base64 string as a static prop.

   2. Add custom styles to position (and blur) the placeholder `img` underneath Next.js' `Image` whilst it loads.

   An `aria-hidden` ensures the content is hidden from screen-readers.

   ```jsx
   // pages/index.jsx
   import * as React from "react";
   import Image from "next/image";
   import { getImage } from "@plaiceholder/next";
   import { getBase64 } from "@plaiceholder/base64";

   export const getStaticProps: GetStaticProps = async () => {
     const imgSrc = "/keila-joa.jpg";
     const img = await getImage(imgSrc);
     const imgBase64 = await getBase64(img);

     return {
       props: {
         imgBase64,
         imgSrc,
       },
     };
   };

   function Index({ imgBase64, imgSrc }) {
     return (
       <main>
         <div style={{ position: "relative", overflow: "hidden" }}>
           {/* Our placeholder image */}
           <img
             aria-hidden="true"
             alt=""
             src={imgBase64}
             style={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               width: "100%",
               height: "100%",
               /* Adjust the content to fit */
               objectFit: "cover",
               objectPosition: "center",
               /* Blur the image and scale to avoid transparent corners */
               filter: "blur(2rem)",
               transform: "scale(1.2)",
             }}
           />
           {/* Your image, optimized by next/image */}
           <Image src={imgSrc} width={4032} height={3024} />
         </div>
       </main>
     );
   }

   export default Index;
   ```

3. [Run your Next.js app](https://nextjs.org/docs/api-reference/cli#build) to see the results in action!

   You should expect to see the placeholder first, then the image optimized by Next.js

## FAQs

- [Why have you misspelled "placeholder"?](#why-have-you-misspelled-placeholder)
- [What about remote images?](#what-about-remote-images)

### Why have you misspelled "placeholder"?

A [Plaice](https://en.wikipedia.org/wiki/European_plaice) is a flat fish that lays stationary on the sea-bed, much like an image placehol… actually this is bullshit, all the other good names were taken.

### What about remote images in Next.js?

In it's current state, `@plaiceholder/next` only supports local images (added to `public`). PRs to add support for remote images are welcomed ❤️.

[blurhash]: https://blurha.sh/
[react-blurhash]: https://github.com/woltapp/react-blurhash
[next/image]: https://nextjs.org/docs/basic-features/image-optimization
[demo]: https://next-placeholder.joebell.co.uk

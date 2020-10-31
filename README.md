<p align="center">
  <img alt="Plaiceholder" src=".github/assets/logo.jpg" />
</p>

<p align="center">
  <strong>Roll-you-own low-quality image placeholders 🖼</strong>
</p>
<p align="center">
  Includes plugins for Next.js (to compliment the latest <a href="https://nextjs.org/docs/basic-features/image-optimization">Image Optimization</a> features).
</p>

<p align="center">
  <strong>
    <a href="https://plaiceholder.co">
      Sponsors get access to premium features ✨
    </a>
  </strong>
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

<br/>

## Table of Contents

1. [Introduction](#introduction)
1. [Setup](#setup)

   1. [Gradient](#gradient)
   1. [SVG](#svg)
   1. [Base64](#base64)
   1. [BlurHash](#blurhash)

1. [Plugins](#plugins)
   1. [Next.js](#next.js)
1. [Examples](#examples)
1. [FAQs](#faqs)

## Introduction

"Plaiceholder" is a collection of **Node.js** helpers for creating low quality image placeholders, with 4 approaches to choose from:

1.  **Gradient** <small>(unique to Plaiceholder)</small>

    Converts a specified image into a low-res placeholder, outputted as a set of `linear-gradient`s.

    **Pros:** Fast `DOMContentLoaded` and `LCP`  
    **Cons:** ? (Still figuring out)

2.  **SVG**  
    Converts a specified image into a low-res placeholder, outputted as an SVG.

    **Pros:** Fast `DOMContentLoaded` and `LCP`  
    **Cons:** ? (Still figuring out)

3.  **Base64**  
    Converts a specified image into a low-res image, encoded as Base64 string.

    **Pros:** Fast `DOMContentLoaded` and `LCP`  
    **Cons:** ? (Still figuring out)

4.  **Blurhash**  
    Converts a specified image into a low-res image, encoded as Blurhash string.

    **Pros:** Lightweight, fast `DOMContentLoaded` and `LCP`  
    **Cons:** As it uses `canvas`, it's not ideal to use Blurhash for above-the-fold content.

It's still worth taking any pros/cons with a grain of salt; as more consumers use Plaiceholder and provide their feedback, it will help determine the fastest option.

## Setup

Choose your own adventure: [BlurHash](#blurhash) or [Base64](#base64)…

### BlurHash

In this example, we're going to use the additional `next-blurhash` package to create a [BlurHash][blurhash] string for a single image inside a Next.js [Page](https://nextjs.org/docs/basic-features/pages).

We'll then use [`react-blurhash`][react-blurhash] to render the string to a canvas, to sit underneath our [`Image`][next/image] whilst it's loading.

> [**See the demo**][demo] for a live example.

1. Add the package to your existing Next.js project:

   ```sh
   npm i next-blurhash react-blurhash
   ```

2. Add your chosen image to the [`public`](https://nextjs.org/docs/basic-features/static-file-serving) directory.

   In this case, our image is `public/keila-joa.jpg` (to match the [demo][demo])

   > In it's current state, `next-blurhash` only supports [local images](#what-about-remote-images).

3. Create a new page (or add to an existing page), and add the following:

   1. Call `getBlurhash()` inside `getStaticProps()` with your image's path **without the `public` prefix**.

      This will return the [BlurHash][blurhash] string as a static prop (which will be decoded to dimensions of **32×32**).

   2. Import `BlurhashCanvas` from [`react-blurhash`][react-blurhash] and supply it with your newly generated static [BlurHash][blurhash] string.

   3. Add custom styles to place the `BlurhashCanvas` underneath Next.js' `Image` whilst it loads.

   ```jsx
   // pages/index.jsx
   import * as React from "react";
   import Image from "next/image";
   import { getBlurhash } from "next-blurhash";
   import { BlurhashCanvas } from "react-blurhash";

   export const getStaticProps: GetStaticProps = async () => {
     const imgSrc = "/keila-joa.jpg";
     const imgHash = await getBlurhash(imgSrc);

     return {
       props: {
         imgHash,
         imgSrc,
       },
     };
   };

   function Index({ imgHash, imgSrc }) {
     return (
       <main>
         <div style={{ position: "relative" }}>
           {/* Canvas sits underneath the `Image` and fills available space */}
           <BlurhashCanvas
             // Your generated Blurhash string
             hash={imgHash}
             // getBlurhash **always** returns 32×32 dimensions
             width={32}
             height={32}
             punch={1}
             style={{
               position: "absolute",
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               width: "100%",
               height: "100%",
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

4. [Run your Next.js app](https://nextjs.org/docs/api-reference/cli#build) to see the results in action!

   You should expect to see the [BlurHash][blurhash] canvas first, then the image optimized by Next.js

### Base64

In this example, we're going to use the base `next-placeholder` package to create a Base64 string for a single image inside a Next.js [Page](https://nextjs.org/docs/basic-features/pages).

We'll then apply the string to an `<img>` element (hidden from screen-readers) and position underneath our [`Image`][next/image] whilst it's loading.

> [**See the demo**][demo] for a live example.

1. Add the package to your existing Next.js project:

   ```sh
   npm i next-placeholder
   ```

2. Add your chosen image to the [`public`](https://nextjs.org/docs/basic-features/static-file-serving) directory.

   In this case, our image is `public/keila-joa.jpg` (to match the [demo][demo])

   > In it's current state, `next-placeholder` only supports [local images](#what-about-remote-images).

3. Create a new page (or add to an existing page), and add the following:

   1. Call `getBase64()` inside `getStaticProps()` with your image's path **without the `public` prefix**. This will return the Base64 string as a static prop.

   2. Add custom styles to position (and blur) the placeholder `img` underneath Next.js' `Image` whilst it loads.

   An `aria-hidden` ensures the content is hidden from screen-readers.

   ```jsx
   // pages/index.jsx
   import * as React from "react";
   import Image from "next/image";
   import { getBase64 } from "next-placeholder";

   export const getStaticProps: GetStaticProps = async () => {
     const imgSrc = "/keila-joa.jpg";
     const imgBase64 = await getBase64(imgSrc);

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

4. [Run your Next.js app](https://nextjs.org/docs/api-reference/cli#build) to see the results in action!

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

## Acknowledgements

- [BlurHash][blurhash] by **Wolt**

## Copyright

- Plaice Image - © Public Domain. American plaice, _[Hippoglossoides platessoides](https://commons.wikimedia.org/wiki/Hippoglossoides_platessoides)_. From plate 107 of Oceanic Ichthyology by G. Brown Goode and Tarleton H. Bean, published 1896.

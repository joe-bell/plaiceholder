# next-placeholder

> **Roll-you-own placeholders for Next.js images 🖼**
>
> Designed to work with [Next.js 10 Image Optimization][next/image]
>
> ---
>
> Choose-your-own approach:  
> [**Base64**](#base64) or [**BlurHash**](#blurhash)
>
> ---
>
> [**See the demo ↗** ][demo]

![NPM Version](https://badgen.net/npm/v/next-placeholder)
![Types Included](https://badgen.net/npm/types/next-placeholder)
![License](https://badgen.net/github/license/joe-bell/next-placeholder)
![NPM Downloads](https://badgen.net/npm/dm/next-placeholder)

## Table of Contents

1. [Setup](#setup)
2. [FAQs](#faqs)

## Setup

- [Base64](#base64)
- [BlurHash](#blurhash)

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

- [What about remote images?](#what-about-remote-images)

### What about remote images?

In it's current state, `next-placeholder` only supports local images (added to `public`). PRs to add support for remote images are welcomed ❤️.

[blurhash]: https://blurha.sh/
[react-blurhash]: https://github.com/woltapp/react-blurhash
[next/image]: https://nextjs.org/docs/basic-features/image-optimization
[demo]: https://next-placeholder.joebell.co.uk

## Acknowledgements

- [BlurHash][blurhash] by **Wolt**

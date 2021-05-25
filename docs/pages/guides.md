import Callout from "nextra-theme-docs/callout";

# Guides

## Next.js

In this example, we're going to use the `plaiceholder` package to create a Base64 string for a single image inside a Next.js [Page](https://nextjs.org/docs/basic-features/pages).

We'll then apply the string to an `<img>` element (hidden from screen-readers) and position underneath our [`Image`][next/image] whilst it's loading.

1. Install [`@plaiceholder/next`](/plugins#next-js)
1. Add your chosen image to the [`public`](https://nextjs.org/docs/basic-features/static-file-serving) directory.

   In this case, our image is `public/keila-joa.jpg`

   <Callout>
     In it's current state, `plaiceholder` only supports [local
     images](/faqs#what-about-remote-images).
   </Callout>

1. Create a new page (or add to an existing page), and add the following:

   1. Call `getBase64()` inside `getStaticProps()` with your image's path **without the `public` prefix**. This will return the Base64 string as a static prop.

   2. Add custom styles to position (and blur) the placeholder `img` underneath Next.js' `Image` whilst it loads.

   An `aria-hidden` ensures the content is hidden from screen-readers.

   ```jsx
   // pages/index.jsx
   import * as React from "react";
   import Image from "next/image";
   import { getPlaiceholder } from "plaiceholder";

   export const getStaticProps: GetStaticProps = async () => {
     const src = "/keila-joa.jpg";
     const { base64 } = await getPlaiceholder(src);

     return {
       props: {
         base64,
         src,
       },
     };
   };

   function Index({ base64, src }) {
     return (
       <main>
         <div style={{ position: "relative", overflow: "hidden" }}>
           {/* Our placeholder image */}
           <img
             aria-hidden="true"
             alt=""
             src={base64}
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
           <Image src={src} width={4032} height={3024} />
         </div>
       </main>
     );
   }

   export default Index;
   ```

1. [Run your Next.js app](https://nextjs.org/docs/api-reference/cli#build) to see the results in action!

   You should expect to see the placeholder first, then the image optimized by Next.js

# Tailwind

:::note

Due to limitations with Tailwind's JIT engine, `@plaiceholder/tailwindcss`
**only** supports local images.

:::

## Installation

1. Install the package alongside your existing [`tailwindcss`](https://tailwindcss.com/docs/installation) installation:

   ```sh
   npm i @plaiceholder/tailwindcss
   ```

2. Add the plugin to your `tailwind.config.js` being sure to enable `"jit"` mode:

   ```js title="tailwind.config.js"
   module.exports = {
     mode: "jit",
     purge: ["./src/**/*.{ts,tsx}"],
     theme: {
       extend: {},
     },
     variants: {},
     plugins: [require("@plaiceholder/tailwindcss")],
   };
   ```

## Usage

Once installed, pure CSS image LQIPs can be created with the following JIT class format:

```html
<!-- 
   returns a pure CSS LQIP for 
   `./public/assets/keila-joa@578.jpg`
-->
<div class="plaiceholder-[/assets/keila-joa@578.jpg]" />
```

The class **only** returns the "pixels" (`linear-gradient` values), allowing you to configure your preferred "blur" effect:

```html
<!-- 
   returns a pure CSS LQIP for 
   `./public/assets/keila-joa@578.jpg`
-->
<div
  class="plaiceholder-[/assets/keila-joa@578.jpg] transform scale-150 filter blur-2xl"
/>
```

## Utils

[Dynamic values aren't supported](https://tailwindcss.com/docs/just-in-time-mode#known-limitations) by JIT mode, meaning arbitrary LQIPs can't be computed.

The values **must** exist at build-time.

```jsx
// ❌ NOT POSSIBLE
const Example = ({ src }) => (
  <div
    className={`plaiceholder-[{src}] transform scale-150 filter blur-2xl`}
  />;
);
```

To circumvent this, `@plaiceholder/tailwindcss` offers an additional `utils` entry point to extract image paths from the JIT classes on the server-side. For example, in a Next.js setup.

```tsx title="pages/example.tsx"
import * as React from "react";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import { extractImgSrc } from "@plaiceholder/tailwindcss/utils";
import { cx } from "@/styles";

export const getStaticProps = async () => {
  const plaiceholder = "plaiceholder-[/assets/keila-joa@578.jpg]";
  const { img } = await getPlaiceholder(extractImgSrc(plaiceholder));

  return {
    props: {
      img,
      plaiceholder,
    },
  };
};

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  img,
  plaiceholder,
}) => (
  <React.Fragment>
    <div
      className={`absolute inset-0 w-full h-full ${plaiceholder} transform scale-150 filter blur-2xl`}
    />
    <Image {...img} />
  </React.Fragment>
);

export default Page;
```

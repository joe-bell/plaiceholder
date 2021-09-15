# Next.js

An essential plugin for Next.js, ensuring that all Plaiceholder functions start in the main thread.

## Installation

1. Add the package alongside your [existing `plaiceholder` installation](/getting-started):

   ```sh
   npm i @plaiceholder/next
   ```

2. Wrap your Next.js config with `withPlaiceholder`:

   ```js title="next.config.js"
   const { withPlaiceholder } = require("@plaiceholder/next");

   module.exports = withPlaiceholder({
     // your Next.js config
   });
   ```

## Usage

…and that's it! Use Next.js and [plaiceholder](/usage) as you would expect.

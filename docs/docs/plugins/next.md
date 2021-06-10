# Next.js

An essential plugin for Next.js, ensuring that all `plaiceholder` functions start in the main thread.

## Installation

1. Install the package alongside your existing `plaiceholder` installation:

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

…and that's it! Use Next.js and `plaiceholder` as you would expect.

# Contributing to Plaiceholder

Welcome, and thanks for your interest in contributing! Please take a moment to review the following:

## Architecture

Plaiceholder uses [PNPM](http://pnpm.io) to develop multiple packages together as a monorepo. These packages are split across three directories:

1. `docs`
2. `packages/`
   - Publicly-consumable packages, published to npm
   - Each package is scoped to the `@plaiceholder/` npm org.
3. `examples/`
   - Non-published packages, primarily for demo-purposes but also for integration testing.
   - Examples are deployed to Vercel.
   - Each package is prefixed with `example-with-`

All `@types/` and shared `devDependencies` should be installed to the [root `package.json`][root:package]

## Style Guide

- **Commits** follow the ["Conventional Commits" specification](https://www.conventionalcommits.org/en/v1.0.0/). This allows for changelogs to be generated automatically upon release.
- **Code** is formatted via [Prettier](https://prettier.io/)
- **JavaScript** is written as [TypeScript](https://www.typescriptlang.org/) where possible.

## Getting Started

### Setup

1. [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) and clone to your machine.
2. Create a new branch with your contribution.
3. Install [pnpm](http://pnpm.io) on your machine.
4. In the repo, install dependencies and link packages via:
   ```sh
   pnpm install
   ```

### Running Scripts

Scripts in the [root `package.json`][root:package] can be run via:

```sh
pnpm <script-name>
```

Individual package scripts can be run in the project root via:

```sh
pnpm <script-name> --filter <package-name>
```

[root:package]: https://github.com/joe-bell/plaiceholder/blob/main/package.json

## Releases

A trade-off with using a personal repo is that permissions are fairly locked-down. In the mean-time releases will be made manually by the project owner.

Releases and versioning are handled by [Changesets](https://pnpm.io/using-changesets).

### Adding Changesets

```sh
pnpm changeset
```

### Publishing

1. Switch into the default branch

   ```sh
   git checkout main
   ```

2. Bump packages and generate `CHANGELOG.md`s based on the previously specified
   changesets.

   ```sh
   pnpm changeset version
   ```

3. Prepare packages and regenerate the lockfile

   ```sh
   pnpm install
   ```

4. Create a commit with the shared version, and push

   ```sh
   git commit vX.X.X
   ```

5. Publish all packages to npm

   ```sh
   pnpm publish -r
   ```

6. Create a tag with the shared version, then push the commit and tag

   ```sh
   git tag vX.X.X
   git push
   git push origin refs/tags/vX.X.X
   ```

7. [Create a release](https://github.com/joe-bell/plaiceholder/releases/new), using the newly pushed tag

## Implementations

So, you want to build an alternative Plaiceholder implementation? Great!

Let's get started…

### Requirements

Please respect that Plaiceholder is just the end result – countless hours of work have gone into making this project, almost all of it in the "free time" of its maintainers.

When building your own implementation, you should meet the following requirements:

- Branding
  - ❌ **Don't** use the "Plaiceholder" name on its own, the logo, tagline or any of the marketing copy from [plaiceholder.co](https://plaiceholder.co).
    The "[Plaiceholder](https://plaiceholder.co)" project is a trading name of "Big Attic OÜ", and therefore should not be confused with affiliation.
  - ✅ **Do** name your project with the `-plaiceholder` suffix **or** `plaiceholder-` prefix.
    e.g. your repo or package, could be called `rust-plaiceholder`, your function could be called `rustPlaiceholder` (but **not** `plaiceholder`).
- Credit

  - ❌ **Don't** mislead others into thinking your implementation is original.
  - ✅ **Do**

    1. Link to the original source, documentation, or site, regularly and where relevant.
    2. Add the following disclaimer to the top of your `README.md`

       ```md
       <p align="center">
         An externally-maintained implementation of
         <strong>
            <a href="https://github.com/joe-bell/plaiceholder">
               Plaiceholder
            </a>
         </strong>
       </p>

       ---

       <!-- your readme content-->
       ```

    3. Use the Apache-2.0 License.
    4. Add a License disclaimer to the bottom of your `README.md`

       ```md
       ## License

       Apache-2.0 License © <!-- your project name -->

       ### Acknowledgements

       #### [Joe Bell](https://github.com/joe-bell) ([Plaiceholder](https://github.com/joe-bell/plaiceholder))

       Copyright © 2020-2022, Joe Bell. All Rights Reserved.

       Licensed under the Apache License, Version 2.0 (the "License").
       ```

If you have any questions above the above requirements, please feel free to [reach out to the maintainers](https://twitter.com/joebell_) directly.

### Raise a PR

Once you've completed the above, raise a PR to add your implementation to the [Community page](https://plaiceholder.co/community).

```

```

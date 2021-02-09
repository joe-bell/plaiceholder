# Contributing to Plaiceholder

Welcome, and thanks for your interest in contributing! Please take a moment to review the following:

## Architecture

Plaiceholder uses [Yarn Workspaces](https://yarnpkg.com/en/docs/workspaces) and [Lerna](https://github.com/lerna/lerna) to develop multiple packages together as a monorepo. These packages are split across three directories:

1. `docs`
2. `packages/`
   - Publicly-consumable packages, published to npm
   - Each package is scoped to the `@plaiceholder/` npm org.
3. `examples/`
   - Non-published packages, primarily for demo-purposes but also for integration testing.
   - Examples are deployed to Vercel.
   - Each package is prefixed with `example-with-`

All `@types/` and shared `devDependencies` should be installed to the [root `package.json`][root:package]

[**`plaiceholder.co`**](https://plaiceholder.co/) is a separate closed-source product. However, if you have any suggestions, please feel free to raise an issue on this repo.

## Style Guide

- **Commits** follow the ["Conventional Commits" specification](https://www.conventionalcommits.org/en/v1.0.0/). This allows for changelogs to be generated automatically upon release.
- **Code** is formatted via [Prettier](https://prettier.io/)
- **JavaScript** is written as [TypeScript](https://www.typescriptlang.org/) where possible.

## Getting Started

### Setup

1. [Fork the repo](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) and clone to your machine.
2. Create a new branch with your contribution.
3. Install [Yarn](https://yarnpkg.com/) on your machine.
4. In the repo, install dependencies and link packages via:
   ```sh
   yarn
   ```

### Running Scripts

Scripts in the [root `package.json`][root:package] can be run via:

```sh
yarn <script-name>
```

Individual package scripts can be run in the project root via:

```sh
yarn workspace <package-name> <script-name>
```

[root:package]: https://github.com/joe-bell/plaiceholder/blob/main/package.json

## Releases

A trade-off with using a personal repo is that permissions are fairly locked-down. In the mean-time releases will be made manually by the project owner.

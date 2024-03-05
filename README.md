# justeat-coding-assignment

## Introduction

This project is a coding assignment for the Early Careers Software Engineering Program. It focuses on fetching and displaying restaurant data from the Just Eat API, displaying the data in a user-defined interface.

This project was developed with Vue 3 in Vite.

## Objective

The aim is to create an interface that displays restaurant data including the name, cuisines, rating (in number), and address. The interface limits the display to the first 10 restaurants returned by the API.

## Interface Requirements

The solution can be implemented as a web interface, console application, or any other format.

## API Endpoint

The following API endpoint is used for fetching restaurant data:
`https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/{postcode}`

When working with the Just Eat API, I encountered CORS (Cross-Origin Resource Sharing) restrictions that prevented my site from directly accessing the API endpoint. To overcome this hurdle, I used a CORS proxy service called https://corsproxy.io/. This proxy acted as an intermediary, forwarding my site's API requests to the Just Eat API while bypassing the CORS restrictions. By routing the requests through the proxy server, I was able to retrieve data from the Just Eat API without running into any CORS-related errors or roadblocks. I would not use this in a production environment, but it was suitable for testing.

I have implemented a store pattern to manage the state and functionality related to fetching restaurant data. The useRestaurantStore function acts as a central hub, responsible for handling the logic for fetching restaurants and filters from the Just Eat API. This approach keeps things organised and makes it easier to scale the application as it grows. This approach also allows the site's components focuse on their main responsibilities, making it easy to manage the overall codebase overall, and to make improvements where and when needed.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Improvements and Reflections

The current project includes unit testing with Vitest, which has been important for ensuring the components' reliability and correctness. However, if I had more time, I would make the following improvements:

Firstly, I would integrate end-to-end testing using Cypress. This would enhance the site's testing suite by validating how features perform from a user's perspective, ensuring all components work smoothly together, covering different real life scenarios.

Secondly, I would focus on enhancing the user interface and experience. Although the current UI is functional, I could make it more engaging and responsive, improving how users interact with the site. For example, I could ensure the interface can be used on different screen sizes and devices. This would provide a consistent and optimal experience across platforms.

Lastly, I would implement more filtering capabilities to offer a more tailored experience for the users. By introducing additional filtering options, users could easily find restaurants acording to their preferences.Whether they want to sort by name, rating, location, offers, etc, these filtering options would allow users to have more control and personalisation, making it easier to discover their favourite restaurant.

These improvements would not only provide a better experience for users but also ensure the site remains reliable, engaging, tailored to their needs, and offer features which other online restaurant platforms lack.

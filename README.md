# time-in Web Component

A web component that allows you to see the time in a specified time zone.

## Scripts

- `npm run dev` - runs the vite dev environment
- `npm run build` - builds the project with vite build
- `npm run local-release` - publishes the package to npm (needs One Time Password) after doing all the checks beforehand
- `npx changeset` - creates a changeset of the latest changes. You can choose if it is a patch, minor, or major change.
- `npm run test` - runs the tests with vitest in watch mode
- `npm run check-test` runs the tests

## To create a new release

1. run `npx changeset` this will create a description of the changes, and update the version (patch, minor, or major)
1. run `npm run local-release` this will run all the checks ahead of doing the release and if it passes, it will create the release on npm. You will need to provide the one-time-password during the process.


## Optional attributes

### tz
provide a country code e.g. europe/paris and the component will show the time of that city.


## Misc Notes

I converted this package following this tutorial: https://www.totaltypescript.com/how-to-create-an-npm-package

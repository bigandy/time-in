# time-in Web Component

A web component that allows you to see the time in a specified time zone.

## Scripts

- `npm run dev` - runs the vite dev environment
- `npm run build` - builds the project with vite build
- `npm run local-release` - publishes the package to npm after doing all the checks beforehand
- `npx changeset` - creates a changeset of the latest changes. You can choose if it is a patch, minor, or major change.
- `npm run test` - runs the tests with vitest in watch mode
- `npm run check-test` runs the tests

## To create a new release

1. run `npx changeset` this will create a description of the changes, and update the version (patch, minor, or major)
1. run `npm run local-release` this will run all the checks ahead of doing the release and if it passes, it will create the release on npm. You will need to provide the one-time-password during the process.


## Optional attributes

### tz
provide a country code e.g. `tz="europe/paris"` and the component will show the time of that city's timezone. To get the full list you can get it with: `Intl.supportedValuesOf("timeZone");`. If no tz attribute is supplied, the time will be that of the computer.

### twelve-hours
if you want the time to use a twelve hours clock then use the `twelve-hours` attribute.

### show-difference
if you want a numerical representation of how many hours ahead or behind your current timezone use the `show-difference`. The difference is between the computer's timezone and the supplied timezone (set with the `tz` attribute).

### hide-seconds
hate showing the seconds? use the `hide-seconds` attribute.

### label
want to provide a label to show what time the component corresponds to? Use the `label` attribute.


## Parts
Current exposed parts are:
- `label` if you provide a label with the `label` attribute.
- `suffix` - the am/pm if using `twelve-hours` prop.
- `seperator` this is the two dots between the hour/minute/second.
- `time` - the whole numeric time part of the html. Not the label or the time-difference.
- `time-difference` - the number of hours difference, used when using the `show-difference` attribute.
- `number` - the hours, minutes, seconds used in the clock.

## Misc Notes

I converted this package following this tutorial: https://www.totaltypescript.com/how-to-create-an-npm-package

# TEMPLATE

This project is a starter-project template for a full-stack website/webapp using the [AdonisJS framework](https://adonisjs.com/). Auth is setup and configured for a 'web' project and the routes exist for a basic user journey and fundamental interactions, i.e. a user can sign-up, upon which they are taken to a 'welcome' page. They can subsequently log in, upon which they are taken to a 'dashboard' page. The logout route is also configured.

## Front end architecture

Adonis itself has no opinions about how the front end of the app is created, other than offering a template engine. So for all other assets (css/js/images etc) we have to roll a custom solution. This template has been configured with Sass and Rollup and works on the 'convention over configuration' principle.

### Additional commands

As well as the commands that every Adonis project comes with, this template also has the following commands setup:

- `npm run styles`: compiles all of the sass code written in `src/scss` and puts it in `public/css`.
- `npm run styles:dev`: the same as `styles` but this time the sass compiler is run in `watch` mode.
- `npm run scripts`: uses [rollup](https://rollupjs.org/guide/en/) to compile all of the js code written in `src/js` and puts it in `public/js/modules`.
- `npm run scripts:dev`: the same as `scripts` but this time rollup is run in `watch` mode.
- `npm run src:build`: runs `styles` and `scripts` commands to build all of the front-end assets in one command.
- `npm run src:dev`: runs `styles:dev` and `scripts:dev` to build all of the front-end assets in watch one, with one command.
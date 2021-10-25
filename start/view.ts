/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import View from '@ioc:Adonis/Core/View';

View.global('routeName', function (req) {
  return req.ctx.route.name;
})

/*
 |------------------------------------------------------------------------
 | Menu Items
 |------------------------------------------------------------------------
 | 
 | A menu 'item' has the following properties:
 |   - route:   The name of the route that the link should go to.
 |   - label:   The text for the link that will appear in the UI.
 |   - context: One of 'global', 'unauth' or 'auth'. "Global" links will always be rendered,
 |              'unauth' links will only be rendered for users that are NOT logged in, and
 |              'auth' links will only be rendered for users that ARE logged in.
*/
View.global('menus', {
  main: [
    { route: 'pages.home', label: 'Home', context: 'global' },
    { route: 'pages.register', label: 'Sign up', context: 'unauth' },
    { route: 'pages.login', label: 'Login', context: 'unauth' },
    { route: 'pages.dashboard', label: 'Dashboard', context: 'auth' },
  ]
});
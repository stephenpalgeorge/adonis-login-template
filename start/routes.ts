/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.get('/', 'PagesController.home').as('pages.home');
Route.get('/login', 'PagesController.login').as('pages.login');
Route.get('/register', 'PagesController.register').as('pages.register');
Route.group(() => {
  Route.get('/dashboard', 'PagesController.dashboard').as('pages.dashboard');
  Route.get('/welcome', 'PagesController.welcome').as('pages.welcome');
}).middleware('auth:web');

Route.group(() => {
  Route.post('register', 'AuthController.register').as('auth.register');
  Route.post('login', 'AuthController.login').as('auth.login');
  Route.post('logout', 'AuthController.logout').as('auth.logout');
}).prefix('api');

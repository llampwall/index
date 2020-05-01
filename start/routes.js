'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('pages/home')

Route.get('/', 'PageController.home')

// auth
Route.get('/register', 'AuthController.register')
Route.post('/register', 'AuthController.storeUser')
Route.get('/login', 'AuthController.login')
Route.post('/login', 'AuthController.loginUser')
Route.get('/forgot', 'AuthController.forgot')
Route.get('/logout', 'AuthController.logout')


// social auth
Route.get('login/facebook', 'SocialController.redirectf')
Route.get('facebook/authenticated', 'SocialController.callbackf')
Route.get('login/google', 'SocialController.redirectg')
Route.get('google/authenticated', 'SocialController.callbackg')

// api
Route.get('/api/intialize', 'ApiController.initialize')

// posts
// Route.resource('/posts', 'PostController').except(['delete'])
Route.get('/posts', 'PostController.index')
Route.post('/posts', 'PostController.store')
// Route.post('/posts/', 'PostController.store')
// Route.get('/posts/:id/delete', 'PostController.destroy')
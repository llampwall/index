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
Route.get('/api/authuser', 'UserController.getLoggedInUser')
Route.get('/api/user/:id', 'UserController.profile')
Route.get('/api/users', 'UserController.getAll')
Route.get('/api/online', 'UserController.getAllOnline')
Route.get('/api/offline', 'UserController.getAllOffline')
Route.get('/api/convo', 'ApiController.getConvo')

// posts
// Route.resource('/posts', 'PostController').except(['delete'])
Route.get('/posts', 'PostController.index')
Route.get('/posts/:id', 'PostController.getPost')
Route.get('/posts/url/:filename/:type', 'PostController.getUrl')
Route.post('/posts', 'PostController.store')
Route.get('/posts/:id/delete', 'PostController.destroy')
Route.get('/posts/:id/comments', 'PostController.comments')
Route.get('/posts/:id/likes', 'PostController.likes')
Route.get('/posts/page/:num', 'PostController.postPage')
Route.get('/posts/new/:id', 'PostController.getNewPosts')


Route.post('/comments', 'PostController.makeComment')
Route.get('/comments/:id/delete', 'PostController.destroyComment')

Route.post('/likes', 'PostController.likePost')
Route.post('/likes/delete', 'PostController.unlikePost')

// ------- react router ----------
// anything that doesnt clear the above routes will
// use the main react page, where react-router 
// will display the {Home} component as it says in the 
// route exact path
Route.any('*', ({ view }) => view.render('pages/react')).middleware(['auth'])
Authkeeper
======

About
---
A ( React + Redux + Node + Express + MongoDB ) concept app which utilizes JSON Web Tokens (JWTs), Higher-Order React Components (HOCs), and Express routing middlewares to do authentication and role-based authorization on both the client and the server.


Motivation
---
JWT-based authentication and authorization on the client is not restricted by domain and is not dependent on a centralized authentication/authorization server once a token has been issued.  And using middlewares to protect server-side routes keeps the server from being dependent on any client-side applications to authenticate and authorize access to its resources.  Thus, by adding a measure of independence between clients and servers for handling authentication and authorization, we can reliably build scaleable applications with distributed microservice architectures without sacrificing security.  Authkeeper should serve as a good starting point for creating such applications using the latest front-end and back-end javascript technologies.


Installation And Setup
---
**server installation:**  from /authkeeper/server run `npm install`

**client installation:**  from /authkeeper/client run `npm install`

**database setup:**  setup a mongodb database and connect to it with `mongoose.connect()` in the server's index.js file

**authentication setup:**

Create a secret signing key consisting of a random character string like so:

	module.exports = {
		secret: '<secret key string goes here>'
	};

Save that as config.js in the /server directory.  This key will be used to generate JWTs in /server/controllers/authentication.js and to validate them in /server/services/passport_strategies.js.


Getting Started
---
1.  start up the database by running:  `mongod`

2.  go to /authkeeper/server/ and start the server up by running:  `npm run dev`

3.  go to /authkeeper/client/ and start the client up by running:  `npm start`

4.  The application should now be running and can be accessed by your browser at **http://localhost:8080/**


How It Works
---
**Client-Side**

In the client's index.js file we have our components being mapped to various URL routes.  Routes which require authentication/authorization have their components wrapped with the appropriate Higher Order Component (HOC).  RequireAuth is an HOC which limits access to authenticated users and RequireAdmin is an HOC which limits access to admins.  The HOCs here check to see if the user has appropriate credentials by checking their authentication and authorization state which is set by the JSON Web Token (JWT) given to the client on signin.  If the user has the appropriate authentication and authorization credentials, then the HOC will allow the component it wraps to be rendered, otherwise it will kick the user back to the root route ('/').

Examples of routes with access protected by HOCs:

	<Route path="protected_content" component={RequireAuth(ProtectedContent)} />

	<Route path="admin_area" component={RequireAdmin(AdminArea)} />


**Server-Side**

Routes are protected on the server-side using middlewares which are applied in the server's router.js file.  

PassportJS and its associated modules was used to create two types of authentication middlewares.  The requireSignin middleware authenticates using a given email and password, and the requireAuth middleware authenticates using a given JWT token.  The Passport authentication strategies for these middlewares are defined in the passport_strategies.js file.

Authorization was accomplished using the custom Express middleware requireAdmin.  It checks to see if the authenticated user is an admin.

Example of middlewares being used to protect the /admin_area route in router.js:

	app.get('/admin_area', requireAuth, requireAdmin, function(req, res, next) {
		res.send({ message: 'server response:  this GET request has been authorized for an admin' });
	});


Important Dependencies Involved In Application Design
---
**Client-Side**

* react - javascript library for creating views/interfaces with components

* redux - responsible for managing the client application's state

* react-router - maps react components to URL routes, thus enabling single-page navigation

* redux-thunk - redux middleware that allows allows us to dispatch actions asynchronously by allowing action creators to return functions

* axios - for making AJAX requests to the server

* jwt-decode - for decoding the data carried in the JWTs given to the authenticated client by the server

* redux-form - an HOC which enables us to store our form state in the redux store

* webpack - builds the client-side portion of our app out of various assets, dependencies, and modules


**Server-Side**

* express - a node.js http server framework and interface

* mongoose - mongoDB object modeling tool

* jwt-simple - we use this module's encode method to create our JSON Web Tokens (JWTs)

* passportJS
    * passport - express authentication middleware
    * passport-jwt - passport strategy/plugin for authenticating with JSON Web Tokens
    * passport-local - passport strategy/plugin for authenticating with an email and password.

* bcrypt-nodejs - for encrypting user passwords before saving them to the database

* cors - gives clients cross-origin access to the server

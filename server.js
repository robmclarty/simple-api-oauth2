var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');
var session = require('express-session');
var port = process.env.PORT || 3000;

var authController = require('./controllers/auth_controller');
var resourceController = require('./controllers/resource_controller');
var userController = require('./controllers/user_controller');
var clientController = require('./controllers/client_controller');
var oauth2Controller = require('./controllers/oauth2_controller');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotspot-api');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use(session({
  secret: 'super secret session key',
  saveUninitialized: true,
  resave: true
}));

var router = express.Router();

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

router.route('/resources')
  .post(authController.isAuthenticated, resourceController.postResources)
  .get(authController.isAuthenticated, resourceController.getResources);

router.route('/resources/:resource_id')
  .get(authController.isAuthenticated, resourceController.getResource)
  .put(authController.isAuthenticated, resourceController.putResource)
  .delete(authController.isAuthenticated, resourceController.deleteResource);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

// Register all routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server started on port ' + port);

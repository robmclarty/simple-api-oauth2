var express = require('express');
var router = express.Router();
var resourceController = require('../controllers/resource_controller');
var userController = require('../controllers/user_controller');
var authController = require('../controllers/auth_controller');
var clientController = require('../controllers/client_controller');
var oauth2Controller = require('../controllers/oauth2_controller');

router.route('/resources')
  .post(authController.isAuthenticated, resourceController.postResources)
  .get(authController.isAuthenticated, resourceController.getResources);

router.route('/resources/:id')
  .get(authController.isAuthenticated, resourceController.getResource)
  .put(authController.isAuthenticated, resourceController.putResource)
  .delete(authController.isAuthenticated, resourceController.deleteResource);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/clients')
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

router.route('/oauth2/authorize')
  .get(authController.isAuthenticated, oauth2Controller.authorization)
  .post(authController.isAuthenticated, oauth2Controller.decision);

router.route('/oauth2/token')
  .post(authController.isClientAuthenticated, oauth2Controller.token);

module.exports = router;

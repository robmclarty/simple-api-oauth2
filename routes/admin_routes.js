var express = require('express');
var router = express.Router();
var requireLogin = require('../middleware/auth_middleware').requireLogin;
var clientController = require('../controllers/client_controller');

// Manage account
router.route('/profile')
  .get(requireLogin, function(req, res) {
    res.render('profile', { user: req.user });
  });

// Manage Clients
router.route('/clients')
  .post(requireLogin, clientController.postClients)
  .get(requireLogin, clientController.getClients);

router.route('/clients/new')
  .get(requireLogin, function(req, res) {
    res.render('clients/new');
  });

router.route('/clients/:id')
  .delete(requireLogin, clientController.deleteClient)
  .get(requireLogin, clientController.getClient);

module.exports = router;

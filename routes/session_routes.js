var express = require('express');
var router = express.Router();
var authController = require('../controllers/auth_controller');

router.route('/login')
  .post(authController.isLocalAuthenticated, function(req, res) {
    console.log("logged in");
    res.redirect('/admin/profile');
  })
  .get(function(req, res) {
    res.render('login');
  });

router.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.redirect('/login');
  });

module.exports = router;

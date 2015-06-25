var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/user');
var Client = require('../models/client');
var Token = require('../models/token');

passport.serializeUser(function(user, callback) {
  callback(null, user.id);
});

passport.deserializeUser(function(id, callback) {
  User.findById(id, function (err, user) {
    callback(err, user);
  });
});

passport.use('local', new LocalStrategy(
  function(username, password, callback) {
    process.nextTick(function() {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return callback(err);
        }
        
        // No user found with that username
        if (!user) {
          return callback(null, false);
        }

        // Make sure the password is correct
        user.verifyPassword(password, function(err, isMatch) {
          if (err) {
            return callback(err);
          }

          // Password did not match
          if (!isMatch) {
            return callback(null, false);
          }

          // Success
          console.log("found user", user);
          return callback(null, user);
        });
      });
    });
  }
));

passport.use('basic', new BasicStrategy(
  function(username, password, callback) {
    console.log("running basic auth");
    console.log(User);

    User.findOne({ username: username }, function(err, user) {
      console.log("result: ", err, user);
      if (err) {
        return callback(err);
      }

      // No user found with that username
      if (!user) {
        return callback(null, false);
      }

      // Make sure the password is correct
      user.verifyPassword(password, function(err, isMatch) {
        if (err) {
          return callback(err);
        }

        // Password did not match
        if (!isMatch) {
          return callback(null, false);
        }

        // Success
        return callback(null, user);
      });
    });
  }
));

passport.use('client-basic', new BasicStrategy(
  function(username, password, callback) {
    Client.findOne({ id: username }, function(err, client) {
      if (err) {
        return callback(err);
      }

      // No client found with that id or bad password
      if (!client || client.secret !== password) {
        return callback(null, false);
      }

      // Success
      return callback(null, client);
    });
  }
));

passport.use('bearer', new BearerStrategy(
  function(accessToken, callback) {
    Token.findOne({ value: accessToken }, function(err, token) {
      if (err) {
        return callback(err);
      }

      // No token found
      if (!token) {
        return callback(null, false);
      }

      User.findOne({ _id: token.userId }, function(err, user) {
        if (err) {
          return callback(err);
        }

        // No user found
        if (!user) {
          return callback(null, false);
        }

        // Simple example with no scope
        callback(null, user, { scope: '*' });
      });
    });
  }
));

exports.isLocalAuthenticated = passport.authenticate('local', { failureRedirect: '/admin/login' });
exports.isAuthenticated = passport.authenticate(['basic', 'bearer'], { session: false });
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });

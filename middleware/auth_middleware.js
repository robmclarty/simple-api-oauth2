// Router middleware to ensure a user is logged in before proceeding.
exports.requireLogin = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  console.log("access denied");
  res.redirect('/login');
}

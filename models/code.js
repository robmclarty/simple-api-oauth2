var mongoose = require('mongoose');

// Oauth2 authorization code schema
// TODO: hash authorization codes (don't store as plain text)
var CodeSchema = new mongoose.Schema({
  value: { type: String, required: true },
  redirectUri: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

module.exports = mongoose.model('Code', CodeSchema);

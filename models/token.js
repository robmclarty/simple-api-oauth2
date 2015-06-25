var mongoose = require('mongoose');

// Oauth2 token schema
// TODO: implement strong hashing scheme for the access token (don't store as plain text)
var TokenSchema = new mongoose.Schema({
  value: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true }
});

module.exports = mongoose.model('Token', TokenSchema);

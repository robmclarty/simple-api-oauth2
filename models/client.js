var mongoose = require('mongoose');

// TODO: auto-generate client id and secret to enforce uniqueness, randomness, and strength
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  id: { type: String, required: true },
  secret: { type: String, required: true },
  userId: { type: String, required: true }
});

module.exports = mongoose.model('Client', ClientSchema);

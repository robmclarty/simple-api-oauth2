var mongoose = require('mongoose');
var uuid = require('node-uuid');

// TODO: auto-generate client id and secret to enforce uniqueness, randomness, and strength
var ClientSchema = new mongoose.Schema({
  name: { type: String, unique: true, require: true },
  id: { type: String, required: true },
  secret: { type: String, required: true },
  userId: { type: String, required: true }
});

ClientSchema.statics = {
  generateId: function() {
    return uuid.v4();
  },

  generateSecret: function() {
    return uuid.v4();
  }
};

module.exports = mongoose.model('Client', ClientSchema);

var mongoose = require('mongoose');

// An example resource that could be served from the API.
// Swap this out for a real resource/model for your specific app.
var ResourceSchema = new mongoose.Schema({
  userId: String,
  name: String,
  type: String,
  body: String
});

module.exports = mongoose.model('Resource', ResourceSchema);

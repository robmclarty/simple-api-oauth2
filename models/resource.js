var mongoose = require('mongoose');

var ResourceSchema = new mongoose.Schema({
  userId: String,
  name: String,
  type: String,
  body: String
});

module.exports = mongoose.model('Resource', ResourceSchema);

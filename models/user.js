var mongoose = require('mongoose');
var Challenge = require('./challenge');

var userSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  facebookId: String,
  githubId: String,
  gallery: [],
  challenges: [{ type: mongoose.Schema.ObjectId, ref: 'Challenge' }],
  position: String
});

module.exports = mongoose.model('User', userSchema);


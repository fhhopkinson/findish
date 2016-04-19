var mongoose      = require('mongoose');

var ChallengeSchema = mongoose.Schema({
   name: { type: String, required: true },
   location: String,
   image: String,
   desc: String,
   position:[{ 
   	name: String,
   	lat: String,
   	lng: String
   }]
});

module.exports = mongoose.model('Challenge', ChallengeSchema);

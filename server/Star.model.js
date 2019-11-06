var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StarSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  ownerEmail: String,
  markerEmail: String,
  goldStar: Number,
  pinkStar: Number
});

module.exports = mongoose.model('Star', StarSchema);

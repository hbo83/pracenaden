var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoldStarSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  ownerEmail: String,
  markerEmail: String
});

module.exports = mongoose.model('GoldStar', GoldStarSchema);

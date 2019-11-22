var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const FileSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: String,
  profilPhoto: Boolean,
  index: Number,
  modified: {
    type: String
  },
  path: {
    type: String,
    required: true
  },
})
module.exports = mongoose.model('OfferFile', FileSchema);

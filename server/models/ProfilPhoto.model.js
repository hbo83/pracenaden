var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ProfilPhotoSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  email: String,
  // name: {
  //   type: String
  // },
  modified: {
    type: String
  },
  originalImg: {
    type: String,
    required: true
  },
  resizedImg: {
    type: String,
    required: true
  },
  pathToResizedImg: String
})
module.exports = mongoose.model('ProfilPhoto', ProfilPhotoSchema);

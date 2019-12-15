var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfilSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  modified: String,
  email: String,
  firstName: String,
  lastName: String,
  price: String,
  city: String,
  category: Array,
  aboutMe: String,
  phone: String,
  phoneVisible: Boolean,
  job: String,
  web: String,
  webVisible: Boolean,
  osvc: Boolean,
  checkboxAgree: Boolean,
  currency: String,
  hideProfil: Boolean
  // profilPhotoPath: String
});

module.exports = mongoose.model('Profil', ProfilSchema);

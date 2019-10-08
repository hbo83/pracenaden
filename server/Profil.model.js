var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfilSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: String,
  name: String,
  money: String,
  city: String,
  category: Array,
  aboutMe: String,
  offerMe: String,
  phone: String,
  job: String,
  web: String,
  webVisible: Boolean,
  facebook: String,
  facebookVisible: Boolean,
  instagram: String,
  instagramVisible: Boolean,
  skype: String,
  skypeVisible: Boolean,
  whatsapp: String,
  whatsappVisible: Boolean,
  osvc: Boolean,
  checkboxAgree: Boolean,
  currency: String,
  hideProfil: Boolean,
  profilPhotoPath: String
});

module.exports = mongoose.model('Profil', ProfilSchema);

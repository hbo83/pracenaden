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
  facebook: String,
  instagram: String,
  skype: String,
  whatsapp: String,
  checked: Boolean,
  checked2: Boolean,
  currency: String
});

module.exports = mongoose.model('Profil', ProfilSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfilSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: String,
  name: String,
  job: String,
  money: String,
  city: String,
  description: String,
  phone: String
});

module.exports = mongoose.model('Profil', ProfilSchema);
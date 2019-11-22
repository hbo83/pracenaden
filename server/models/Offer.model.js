var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OfferSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: String,
  title: String,
  price: String,
  category: Array,
  aboutOffer: String,
  currency: String,
  showOffer: Boolean,
  city: String,
  exposeDate: String,
  hideDate: String

});

module.exports = mongoose.model('Offer', OfferSchema);

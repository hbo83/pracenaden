import axios from 'axios'
export default class SaveOffer {
  constructor(url) {
    this.url = url
  }
  saveOffer(email, title, price, city, category, currency, hideOffer, aboutOffer) {
    axios.put(this.url, {

      email: email,
      title: title,
      price: price,
      city: city,
      category: category,
      currency: currency,
      hideOffer: hideOffer,
      aboutOffer: aboutOffer


    }).then(alert("Poptávka uložen"))
  }
}

import axios from 'axios'
export default class SaveOffer {
  constructor(url) {
    this.url = url
  }
  saveOffer(email, title, price, category, currency, hideOffer, aboutOffer) {
    axios.put(this.url, {

      email: email,
      title: title,
      price: price,
      category: category,
      currency: currency,
      hideOffer: hideOffer,
      aboutOffer: aboutOffer


    }).then(alert("Poptávka uložen"))
  }
}

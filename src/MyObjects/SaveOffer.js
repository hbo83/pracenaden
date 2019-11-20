import axios from 'axios'
export default class SaveOffer {
  constructor(url) {
    this.url = url
  }
  saveOffer(email, title, price, city, category, currency, showOffer, aboutOffer, exposeDate, hideDate) {
    axios.put(this.url, {

      email: email,
      title: title,
      price: price,
      city: city,
      category: category,
      currency: currency,
      showOffer: showOffer,
      aboutOffer: aboutOffer,
      exposeDate: exposeDate,
      hideDate: hideDate


    }).then(alert("Poptávka uložen"))
  }
}

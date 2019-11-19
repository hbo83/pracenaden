import axios from 'axios'
export default class LoadOffer {
  constructor(url) {
    this.url = url
    this.data = 123
    // this.dat = axios.get(this.url)
    // .then((response) => {
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  get dat() {
    return this.data
  }
  loadOffer() {

    axios.get(this.url)
    .then((response) => {

// email =  response.data[index].email,
// title =  response.data[index].title,
// price =  response.data[index].price,
// category =  response.data[index].category,
// currency =  response.data[index].currency,
// hideOffer =  response.data[index].hideOffer,
// aboutOffer =  response.data[index].aboutOffer
      this.data = response.data
      console.log(this.dat)
      })
      .catch((error) => {
        console.log(error);
      });

  }

}
// return {
//   email: email,
//   title: title,
//   price: price,
//   category: category,
//   currency: currency,
//   hideOffer: hideOffer,
//   aboutOffer: aboutOffer
// }

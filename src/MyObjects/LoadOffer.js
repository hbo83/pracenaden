import axios from 'axios'
export default class LoadOffer {
  constructor(url) {
    this.url = url
  }
  loadOffer(index) {
    axios.get(this.url)
    .then((response) => {
        //osetrit vyjimku kdyz jeste nema profil vyplnenej

        console.log(response.data)
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

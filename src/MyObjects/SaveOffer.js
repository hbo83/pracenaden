import axios from 'axios'
export default class SaveOffer {
  constructor(url) {
    this.url = url
  }
  saveOffer(obj) {
    axios.put(this.url, obj).then(alert("Poptávka uložen"))
  }
}

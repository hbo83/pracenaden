import axios from 'axios'
export default class ProfilEditGalerySave {
  constructor(email) {
    this.email = email,
    this.url = 'http://10.0.0.22:8081/img',
    this.selectedFile = event.target.files[0]
  }
  saveImg(bol) {//true if ProfilPhoto or false for galery img
    const fd = new FormData();
    fd.append('profilPhoto', bol);
    fd.append('email', this.email);
    fd.append('productImage', this.selectedFile, this.selectedFile.name)

    return axios.post(this.url, fd, {//kdyz vratim promisu touhle metodou, tak potom muzu profileditu pridat dalsi then
        onUploadProgress: uploadEvent => {
          console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%');
        }
      })
  }
}
//tyhle objektu ty musi byt, ptze preci nebudu psat v kazdy komponente stejnou metodu

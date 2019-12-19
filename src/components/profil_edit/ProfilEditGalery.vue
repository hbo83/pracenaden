<template>
<div>
  <v-snackbar v-model="snackbar" :bottom="y === 'bottom'" :color="color" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'">
    {{ text }}
    <v-btn succes text @click="delImg(imgToDelete)">
      Ano
    </v-btn>
    <v-btn error text @click="snackbar = false">
      Ne
    </v-btn>
  </v-snackbar>
  <v-row justify="center">
    <v-col v-for="(image, index) in imgs" v-bind:index="index" class="col-1" style="min-width: 153px">

      <v-img style="cursor: pointer" :src="imgs[index].pathToResizedImg" @click="setImgToDelete(imgs[index])" aspect-ratio="1" :lazy-src="imgs[index].pathToResizedImg"></v-img>

    </v-col>
    <v-col cols='2'>
      <upload-btn class="uplBtn galeryBtn" noTitleUpdate block title="" @file-update="uploadGaleryPhoto(false)">
        <template slot="icon">
          <v-icon>add</v-icon>
        </template>
      </upload-btn>
    </v-col>
  </v-row>
</div>
</template>

<script>
import axios from 'axios'
import UploadButton from 'vuetify-upload-button';
import ProfilEditGalerySave from '@/components/profil_edit/js/ProfilEditGalerySave.js'
export default {
  name: 'ProfilEditGalery',
  components: {
    'upload-btn': UploadButton,
  },
  data: function() {
    return {
      imgs: [],
      color: 'error',
      mode: '',
      snackbar: false,
      text: 'Chcete fotku opravdu smazat?',
      timeout: 6000,
      x: null,
      y: 'bottom',

      imgToDelete: ''
    }
  },
  methods: {
    setImgToDelete(img) {//preda index fotky do data, odkud si ho vezme btn ze snackbar
      this.imgToDelete = img
      this.snackbar = true
    },
    getImgs() {

      axios.get('http://10.0.0.22:8081/img/' + this.$store.state.userLoged.email) //naplni imgs[] objektama fotek
        .then((response) => {
          this.imgs = response.data
        })
        .catch((error) => {
          console.log(error);
        });

      axios.get('http://10.0.0.22:8081/profilesedit/' + this.$store.state.userLoged._id)
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
          this.formContent = response.data[0]
        })
        .catch((error) => {
          console.log(error);
        });
    },
    delImg(img) {
      // if (confirm('Určitě chcete smazat soubor?')) {
        console.log(img)
        axios.delete('http://10.0.0.22:8081/img/' + img._id)
          .then((response) => {
            console.log(img);
          })
          .catch((error) => {
            console.log(error);
          });
          this.snackbar = false
        alert("Obrázek byl smazán")
      // }
      this.imgs = this.imgs.filter(item => item !== img) //zmensi pole o ten prvek ktery jsem samaz, tim padem se prekresli komponenta
    },
      uploadGaleryPhoto() {

        const saveProfilImg = new ProfilEditGalerySave(this.$store.state.userLoged.email);
        saveProfilImg.saveImg(false) //false pro galery img
          .then(res => {
            console.log(res);
            alert('Soubor byl nahrán')
            // alert(res)
            this.imgs.push({
              pathToResizedImg: "http://10.0.0.22:8081/uploads/" + res.data.createdProduct.name
            }) //prida novy objekt do pole a tim prekresli komponentu
          })
      },
  },
  mounted() {
    this.getImgs()
  }
}
</script>

<style>
.galeryBtn .v-btn__content {
  height: 125px!important
}
</style>

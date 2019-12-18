<template>
<div class="profilPhoto" style="position: relative; top: 120px; margin-bottom: 120px; display: flex; justify-content: center;">
  <!-- <img :src="profilePath" alt="profilPhoto" width="150px"> -->
  <v-img style="cursor: pointer" :src="profilePath" aspect-ratio="1" :lazy-src="profilePath" alt="profilPhoto"></v-img>
  <upload-btn class="uplBtn photoBtn" noTitleUpdate block title="" @file-update="uploadGaleryPhoto">
    <template slot="icon">
      <v-icon>add</v-icon>
    </template>
  </upload-btn>
</div>
</template>

<script>
import axios from 'axios'
import UploadButton from 'vuetify-upload-button';
import ProfilEditPhotoSave from '@/components/profil_edit/js/ProfilEditPhotoSave.js'
export default {
  name: 'ProfilEditPhoto',
  components: {
    'upload-btn': UploadButton,
  },
  data() {
    return {
      index: null,
      profilePath: '',
      allProfiles: [] //index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles
    }
  },

  methods: {
    uploadGaleryPhoto() {

      const saveProfilPhoto = new ProfilEditPhotoSave(this.$store.state.userLoged);
      saveProfilPhoto.saveImg()

    }
  },
  computed: { //computed se bude pocitat jen v tom pripade ze nekde bude v sablone pouzito!!!

  },
  beforeMount() {
    // axios.get('http://10.0.0.22:8081/profiles')
    // .then((response) => {
    //   console.log(response.data)
    //   this.allProfiles = response.data
    //   // alert(response.data)
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  },
  mounted() {//to foto tam nezustane pokud se tam znovu neodkazu z profilu kde se ulozi aktualni profil ( mail)
      axios.get('http://10.0.0.22:8081/profilphoto/' + this.$store.state.currentProfile.email)
        .then((response) => {
          this.profilePath = response.data[0].pathToResizedImg
          console.log(response.data)
        })

        .catch((error) => {
          console.log(error);
        });
    }

}
</script>

<style>
.photoBtn .v-btn__content {
  height: 55px!important
}
</style>

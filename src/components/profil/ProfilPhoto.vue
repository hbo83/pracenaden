<template>
<div class="profilPhoto" style="position: relative; top: 120px; margin-bottom: 120px; display: flex; justify-content: center;">
    <img src="http://10.0.0.22:8081/uploads/hbo83@seznam.cz/profil/resized/pr.PNG" alt="profilPhoto" width="150px">
    <upload-btn class="uplBtn" noTitleUpdate block title="Nahrát fotku" @file-update="uploadGaleryPhoto">
      <template slot="icon">
        <v-icon>add</v-icon>
      </template>
    </upload-btn>
</div>
</template>

<script>
import axios from 'axios'
import UploadButton from 'vuetify-upload-button';
export default {
  name: 'ProfilPhoto',
  components: {
    'upload-btn': UploadButton,
  },
  data() {
    return {
      index: null,
      allProfiles: [] //index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles
    }
  },

  methods: {

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
  mounted() {

  }
}
</script>

<style scoped>

</style>

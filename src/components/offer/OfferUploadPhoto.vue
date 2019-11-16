<template>
<div>
  <br /><br />
  <v-row>
    <v-col>
      <h3>Vaše Galerie</h3>
    </v-col>
    <v-col>

      <upload-btn title="Nahrát fotku" @file-update="uploadGaleryPhoto">
        <template slot="icon">
          <v-icon>add</v-icon>
        </template>
      </upload-btn>
    </v-col>
  </v-row>
  <hr />

</div>
</template>

<script>
import axios from 'axios'
import UploadButton from 'vuetify-upload-button';
export default {
  name: 'OfferUploadPhoto',
  components: {
    'upload-btn': UploadButton,
  },
  data() {
    return {
      email: '',
      id: '',
      currentOfferIndex: null
    }
  },
  methods: {

    uploadGaleryPhoto() {
      this.selectedFile = event.target.files[0]
      const fd = new FormData();
      // fd.append('profilPhoto', false);
      fd.append('currentOfferIndex', this.currentOfferIndex);
      fd.append('email', this.email);
      fd.append('_id', this.id); //pripoji klic a hodnotu, ktera se pak sparsuje jako req.body.name na serveru
      fd.append('productImage', this.selectedFile, this.selectedFile.name)
      axios.post('http://localhost:8081/imgoffer', fd, {
          onUploadProgress: uploadEvent => {
            console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%');
          }
        })
        .then(res => {
          console.log(res);
          alert('Soubor byl nahrán')
        })
    },
  },
  computed: {

  },
  mounted() {
    this.id = this.$store.state.userLogedId
    this.email = this.$store.state.userLoged
    this.currentOfferIndex = this.$store.state.currentOfferIndex
  },

}
</script>

<style scoped>

</style>

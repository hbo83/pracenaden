<template>
  <v-row style="padding-left: 5%; padding-right: 6%" justify="start" max-width="1826px">
<v-col v-for="(image, imgIndex) in ownUserImages" v-bind:index="imgIndex" class="galleryImg col-2">

  <v-img :src="getImgSrc(imgIndex)" :lazy-src="getImgSrc(imgIndex)" aspect-ratio="1"  class="grey lighten-2" max-width="300" max-height="200" style="border: 5px solid grey; border-radius: 0px; cursor: pointer">
  </v-img>

  <v-card>

  </v-card>

</v-col>
</v-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfilGalery',
  data() {
    return {
      aboutMe: '',
      thisProfil: {},
      profilIndex: null, //index aktuálního profilu
      imgIndex: null,
      ownUserImages: []
    }
  },
  methods: {
    getImgSrc: function(i) {//vrati cestu k obrazku
      return "http://localhost:8081/uploads/" + this.ownUserImages[i].productImage
    },
  },
  computed: {

  },
  beforeMount() {

    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

    axios.get('http://localhost:8081/img/' + this.$store.state.allProfiles[this.profilIndex].email) //najde vsechny obrázky, s timto emailem

      .then((response) => {
        this.ownUserImages = response.data
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

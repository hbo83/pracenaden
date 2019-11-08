<template>
<div>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">

      </template>

      <v-card>
        <v-img :src="get_fullImg"></v-img>
      </v-card>
    </v-dialog>
  </div>
  <v-row style="padding-left: 5%; padding-right: 6%" justify="start" max-width="1826px">
    <v-col @click="showCarousel(imgIndex)" v-for="(image, imgIndex) in ownUserImages" v-bind:index="imgIndex" class="galleryImg col-2">

      <v-img :src="getImgSrc(imgIndex)" :lazy-src="getImgSrc(imgIndex)" aspect-ratio="1" class="grey lighten-2" max-width="300" max-height="200" style="border: 5px solid grey; border-radius: 0px; cursor: pointer">
      </v-img>

      <v-card>

      </v-card>

    </v-col>
  </v-row>
  <!-- <GaleryCarousel v-if="carouselVisible" /> -->
</div>
</template>

<script>
import axios from 'axios'
// import GaleryCarousel from '@/components/GaleryCarousel.vue'
export default {
  name: 'ProfilGalery',
  data() {
    return {
      dialog: false,
      // carouselVisible: false, //carousel popup yes/no
      aboutMe: '',
      thisProfil: {},
      profilIndex: null, //index aktuálního profilu
      imgIndex: null,
      ownUserImages: [0],
      fullImgIndex: 0
    }
  },
  methods: {
    getImgSrc: function(i) { //vrati cestu k obrazku
      return "http://localhost:8081/uploads/" + this.ownUserImages[i].productImage
    },
    showCarousel(imgIndex) {
      this.dialog = true
      this.fullImgIndex = imgIndex
      console.log(this.ownUserImages[0].productImage)
    }
  },
  computed: {
    get_fullImg() {
      // return "http://localhost:8081/uploads/" + "hbo83@seznam.cz/profilPhoto.jpg"
      return "http://localhost:8081/uploads/" + this.ownUserImages[this.fullImgIndex].productImage
    }
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

  },
  components: {
    // GaleryCarousel
  }
}
</script>

<style scoped>

</style>

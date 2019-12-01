<template>
<div style="overflow: scroll; height: auto; width: 100%">
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

  <div style="display: flex; justify-content: space-around;">
    <div style="cursor: pointer;">
      <v-icon color="yellow" large>keyboard_arrow_left</v-icon>
    </div>
    <!-- <v-col @click="showFullImg(imgIndex)" v-for="(image, imgIndex) in ownUserImages" v-bind:index="imgIndex" class="galleryImg col-2" style="max-width: 130px"> -->
      <v-img @click="showFullImg(imgIndex)" v-for="(image, imgIndex) in ownUserImages" v-bind:index="imgIndex" :src="getImgSrc(imgIndex)" :lazy-src="getImgSrc(imgIndex)" aspect-ratio="1" class="grey lighten-2 profilImg" style="max-width: 130px">
      </v-img>
    <!-- </v-col> -->
    <div style="cursor: pointer;">
      <v-icon color="yellow" large>keyboard_arrow_right</v-icon>
    </div>
  </div>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfilGalery',
  data() {
    return {
      dialog: false,//popup okno visible
      imgIndex: null,
      ownUserImages: [0],
      fullImgIndex: 0
    }
  },
  methods: {
    getImgSrc: function(i) { //vrati cestu k obrazku
      console.log(this.ownUserImages[i].productImage)
      return "http://localhost:8081/uploads/" + this.ownUserImages[i].productImage//pathToImg
    },
    showFullImg(imgIndex) {//zobrazí img v popup okně
      this.dialog = true//popup okno visible
      this.fullImgIndex = imgIndex
    }
  },
  computed: {
    get_fullImg() {
      return "http://localhost:8081/uploads/" + this.ownUserImages[this.fullImgIndex].productImage
    }
  },
  beforeMount() {
    axios.get('http://localhost:8081/img/' + this.$store.state.currentProfile.email) //najde vsechny obrázky, s timto emailem
      .then((response) => {
        this.ownUserImages = response.data
        console.log(this.$store.state.currentProfile.email)
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
.profilImg {
   border: 5px solid grey;
   border-radius: 0px;
   cursor: pointer
}
</style>

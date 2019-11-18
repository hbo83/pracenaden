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
        <!-- <v-img src="http://localhost:8081/uploads/hbo83@seznam.cz/offers/0/git.png"></v-img> -->
        <v-img :src="get_fullImg"></v-img>
      </v-card>
    </v-dialog>
  </div>


  <v-row style="padding-left: 5%; padding-right: 6%" justify="start" max-width="1826px">
    <v-col @click="showFullImg(imgIndex)" v-for="(image, imgIndex) in ownUserImages" v-bind:index="imgIndex" class="galleryImg col-2">
      <v-img :src="getImgSrc(imgIndex)" :lazy-src="getImgSrc(imgIndex)" aspect-ratio="1" class="grey lighten-2" max-width="300" max-height="200" style="border: 5px solid grey; border-radius: 0px; cursor: pointer">
      </v-img>
    </v-col>
  </v-row>

</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OfferGalery',
  components: {

  },
  data() {
    return {
      email: '',
      dialog: false,//popup okno visible
      profilIndex: null, //index aktuálního profilu
      imgIndex: null,
      ownUserImages: [],//pole vracenych objektů
      fullImg: null
    }
  },
  methods: {
    getImgSrc: function(i) { //vrati cestu k obrazku
      // console.log(this.ownUserImages[i].path)
      // console.log(this.ownUserImages[0].path)
      return "http://localhost:8081/uploads/" + this.ownUserImages[i].path
    },
    showFullImg(imgIndex) {//zobrazí img v popup okně
      this.dialog = true//popup okno visible
      this.fullImg = "http://localhost:8081/uploads/" + this.ownUserImages[imgIndex].path
    },
    delImg(id) {
      if (confirm('Určitě chcete smazat soubor?')) {

        axios.delete('http://localhost:8081/img/' + id._id)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        alert("Obrázek byl smazán")
      }
    },
  },
  computed: {
    get_fullImg() {
      return this.fullImg
    }
  },
  beforeMount() {
    this.email = this.$store.state.userLoged
    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu
    this.currentOfferIndex = this.$store.state.currentOfferIndex//vezme ze storu aktualni index nabidky
    axios.get('http://localhost:8081/imgoffer?email=' + this.email + '&index=' + this.currentOfferIndex) //najde vsechny obrázky, s timto emailem
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

}
</script>

<style scoped>

</style>

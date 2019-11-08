<template>
  <v-carousel height="100%">
    <v-carousel-item
      v-for="(item,i) in ownUserImages"
      :key="i"
      :src="item"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>

import axios from 'axios'
export default {
  name: 'GaleryCarousel',

  data() {
    return {
      profilIndex: null,
      ownUserImages: [],
    }
  },

  methods: {

  },
  computed: {

  },
  beforeMount() {

    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

    axios.get('http://localhost:8081/img/' + this.$store.state.allProfiles[this.profilIndex].email) //najde vsechny obrázky, s timto emailem

      .then((response) => {
        response.data.forEach( img =>  {
          // this.ownUserImages.push( img.productImage )
          this.ownUserImages.push( "http://localhost:8081/uploads/" + img.productImage )
          // console.log(this.ownUserImages)
        })
        console.log(this.ownUserImages)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {

  },
  components: {

  }
}
</script>

<style scoped>



</style>

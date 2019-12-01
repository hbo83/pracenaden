<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
/*ty ikony nefungovali ptze se mel nastaveno mdi misto mdiSvg viz
https://vuetifyjs.com/en/customization/icons*/
import axios from 'axios'
  export default {
    data () {
      return {
        items: [],//pole imgs
      }
    },
    beforeMount() {
      axios.get('http://localhost:8081/img/' + this.$store.state.currentProfile.email) //najde vsechny obrázky, s timto emailem
        .then((response) => {
          this.items = response.data.map(function(value, index) {
            return "http://localhost:8081/uploads/" + value
            })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
</script>

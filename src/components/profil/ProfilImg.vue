<template>
<div class="profilImg">
  <img :src="getProfilePath" alt="profilPhoto" style="height: 100px;width: 100px; border-radius: 5px; margin: auto">
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProfilImg',
  data() {
    return {
      profilePath: 'http://10.0.0.22:8081/uploads/no-photo.png' //cesta k profilove fotce, kdyz neexistuje zdroj obrazku, zobrazi se defaultni img
    }
  },
  props: {
    index: {
      type: Number,
      required: false
    }
  },
  methods: {

  },
  computed: {
    getProfilePath() {
      return this.profilePath
    }
  },
  beforeMount() {

  },
  mounted() {
    axios.get('http://10.0.0.22:8081/profilphoto/' + this.$store.state.currentProfile.email)//tady musi byt email, protoze to bere z kolekce profilephotos
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

<style scoped>
.profilImg {
  max-width: 200px;
  max-height: 166px;
  overflow: hidden;
}
</style>

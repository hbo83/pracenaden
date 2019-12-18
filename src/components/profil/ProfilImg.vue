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
    getProfilePath() { //najde zaznam file na zaklade mailu profilu a profilPhoto = true
      // console.log(this.$store.state.allProfiles[this.index].email)

      return this.profilePath
    }
  },
  beforeMount() {

  },
  mounted() {
    console.log(123)
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

<style scoped>
.profilImg {
  max-width: 200px;
  max-height: 166px;
  overflow: hidden;
}
</style>

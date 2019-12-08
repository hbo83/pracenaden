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

      axios.get('http://10.0.0.22:8081/img/' + this.$store.state.allProfiles[this.index].email)
        .then((response) => {
          response.data.map(img => { //vrati imgs z profilu a vytvori path k profilovy fotcce
            if (img.profilPhoto) {
              this.profilePath = img.pathToResizedImg
              console.log(this.profilPhoto)
            }
          })
        })
        .catch((error) => {
          console.log(error);
        });
      return this.profilePath
    }
  },
  beforeMount() {

  },
  mounted() {

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

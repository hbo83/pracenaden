<template>
<div class="profilImg">
        <img :src="getProfilePath" alt="profilPhoto" style="height: 150px;width: 150px; border-radius: 5px; margin: auto">
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ProfilImg',
  data() {
    return {
      profilIndex: null,
      profilePath: null
    }
  },
    props: {
      index: {
        type: Number,
        required: false
      }
    },
  methods: {
    //kdyz neexistuje zdroj obrazku, zobrazi se defaultni img
    // onError () {
    //   this.msg = 'http://localhost:8081/uploads/no-photo.png'
    // }
  },
  computed: {
    getProfilePath() {

      //najde vsechny obrázky, s timto emailem
      axios.get('http://localhost:8081/img/' + this.$store.state.allProfiles[this.index].email)

        .then((response) => {
          response.data.map( img => {//vrati imgs z profilu a vytvori path k profilovy fotcce
            if ( img.profilPhoto ) {
              this.profilePath = 'http://localhost:8081/uploads/' + img.productImage
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
      this.profilIndex = this.$store.state.currentProfilIndex
      // console.log(this.index)
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

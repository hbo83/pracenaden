<template>
  <v-card >
      <!-- <v-card-title max-width="50%"></v-card-title> -->
    <v-card-text id="tr" style="text-align: left; color: green;">{{get_currentAboutMe}}</v-card-text>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AboutMe',
  data() {
    return {
      aboutMe: '',//aboutMe content
      // name: '',//vraci jmeno
      profilIndex: null, //index aktuálního profilu
    }
  },
  methods: {

  },
  computed: {
    get_currentAboutMe() {//naplní aboutMe pri zmene vybraneho profilu
      axios.get('http://10.0.0.22:8081/profiles/' + this.$store.state.currentProfilEmail)
        .then((response) => {
          this.aboutMe = response.data[0].aboutMe
          // this.name = response.data[0].name
          document.getElementById("tr").innerHTML = this.aboutMe;
        })
        .catch((error) => {
          console.log(error);
        });
        // return this.name
    }
  },
  beforeMount() {

  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

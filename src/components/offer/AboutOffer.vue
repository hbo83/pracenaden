<template>
<v-col class="col-12">

  <v-card height="367px">
    <v-card class="">
      <v-card-title max-width="50%">Detail poptávky:</v-card-title>
    </v-card>
    <v-card-text id="tr" style="text-align: left; color: green;"></v-card-text>
  </v-card>
</v-col>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AboutOffer',
  data() {
    return {
      aboutMe: '',//aboutMe content
      thisProfil: {},//thisProfile object
      profilIndex: null, //index aktuálního profilu
    }
  },
  methods: {

  },
  computed: {

  },
  beforeMount() {

    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

  },
  mounted() {
    axios.get('http://localhost:8081/profiles/' + this.$store.state.allProfiles[this.profilIndex].email) //vrátí aktuální profil
      .then((response) => {
        // console.log(response.data)
        this.thisProfil = response.data[0]
        this.aboutMe = response.data[0].aboutMe
        document.getElementById("tr").innerHTML = this.aboutMe;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style scoped>

</style>

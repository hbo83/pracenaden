<template>
<v-col class="col-12">
  <v-card height="367px">
    <v-card class="">
      <v-card-title max-width="50%">Něco o mně:</v-card-title>
    </v-card>
    <v-card-text style="text-align: left; color: green;">{{ getAboutMe }}</v-card-text>

  </v-card>
</v-col>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AboutMe',
  data() {
    return {
      aboutMe: '',
      thisProfil: {},
      profilIndex: null, //index aktuálního profilu
    }
  },
  methods: {

  },
  computed: {
    getAboutMe() {
      return this.aboutMe
    }
  },
  beforeMount() {

    this.profilIndex = this.$store.state.currentProfilIndex //vezme ze store index aktuálního profilu

  },
  mounted() {
    axios.get('http://localhost:8081/profiles/' + this.$store.state.allProfiles[this.profilIndex].email) //vrátí aktuální profil
      .then((response) => {
        console.log(response.data)
        this.thisProfil = response.data[0]
        this.aboutMe = response.data[0].aboutMe
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>

<style scoped>

</style>

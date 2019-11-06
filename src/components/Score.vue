<template>
<v-col class="col-12">
  <v-card class="">
    <v-row class="stars" justify="center">
      <v-col cols="4" class="">
        <span>
            <v-icon class="star" @click="goldStarIncrement" color="yellow" large>star</v-icon>
          </span><span>10</span>

      </v-col>
      <v-col cols="4">
        <span>
          <v-icon class="star" color="pink" large>star</v-icon>
        </span><span>10</span>
      </v-col>
    </v-row>
  </v-card>
</v-col>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Score',

  data() {
    return {
      userLoged: null,
      profilIndex: null,
      starProfil: null
    }
  },
  methods: {
    goldStarIncrement() {
      axios.put('http://localhost:8081/stars?ownerEmail=' + this.starProfil + '&markerEmail=' + this.userLoged)//vrátí aktuální profil
        .then((response) => {
          console.log(response.data)
          // this.$store.commit('setAllProfiles', response.data)
          // this.thisProfil = response.data[0]
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  computed: {

  },
  mounted() {
    this.userLoged = this.$store.state.userLoged
    this.profilIndex = this.$store.state.currentProfilIndex
    this.starProfil = this.$store.state.allProfiles[this.profilIndex].email
    console.log(this.userLoged + this.starProfil)
  },
  components: {

  }
}
</script>

<style scoped>
.star {
  cursor: pointer;
}


</style>

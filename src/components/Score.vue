<template>
<v-col class="col-12">
  <v-card class="">
    <v-row class="stars" justify="center">
      <v-col cols="4" class="">
        <span>
            <v-icon class="star" @click="goldStarIncrement" color="yellow" large>star</v-icon>
          </span><span>{{get_goldStarsCount}}</span>

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
      starProfil: null,
      goldStarsCount: 1//pocet zlatych hvezd
    }
  },
  methods: {
    goldStarIncrement() {
      axios.post('http://localhost:8081/goldstars?ownerEmail=' + this.starProfil + '&markerEmail=' + this.userLoged)//vrátí aktuální profil
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  computed: {
    get_goldStarsCount() {
      return this.goldStarsCount
    }
  },
  mounted() {
    this.userLoged = this.$store.state.userLoged
    this.profilIndex = this.$store.state.currentProfilIndex
    this.starProfil = this.$store.state.allProfiles[this.profilIndex].email
    console.log(this.userLoged + this.starProfil)

    axios.get('http://localhost:8081/goldstars/' + this.starProfil)//vrátí pocet hvezd
      .then((response) => {
        console.log(response.data)
        this.goldStarsCount = response.data.length
      })
      .catch((error) => {
        console.log(error);
      });
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

<template>
<v-col class="col-12">
  <v-card class="">
    <v-row class="stars" justify="center">
      <v-col cols="4" class="">
        <span>
            <v-icon class="star" @click="goldStarIncrement" color="yellow" large>{{get_star}}</v-icon>
          </span><span>{{get_goldStarsCount}}</span>

      </v-col>
      <v-col cols="4">
        <!-- <span>
          <v-icon class="star" color="pink" large>star</v-icon>
        </span><span>10</span> -->
      </v-col>
    </v-row>
  </v-card>
</v-col>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OfferScore',

  data() {
    return {
      userLoged: null,
      profilIndex: null,
      starProfil: null,//email profilu, ktery je hodnocen
      goldStarsCount: 1,//pocet zlatych hvezd
      allreadyMarked: false//hodnotil jiz userLoge tento starProfil?
    }
  },
  methods: {
    goldStarIncrement() {
      if ( this.starProfil === this.userLoged) {
        alert( "nelze hodnoti sám sebe" )
      } else if (this.allreadyMarked) {
        alert( "tento profil jste jiz hodnotil" )
      } else {

        this.allreadyMarked = true//po ohodnoceni vybarvi hvezdu
        this.goldStarsCount++//po ohodnoceni hned inkrementuje pocet hvezd

        axios.post('http://localhost:8081/goldstars?ownerEmail=' + this.starProfil + '&markerEmail=' + this.userLoged)//vrátí aktuální profil
        .then((response) => {
          // console.log(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
      }
      }
  },
  computed: {
    get_goldStarsCount() {
      return this.goldStarsCount
    },
    get_star() {
      if(this.allreadyMarked) {
        return "star"
      } else {
        return "star_border"
      }
    }
  },
  mounted() {
    this.userLoged = this.$store.state.userLoged
    this.profilIndex = this.$store.state.currentProfilIndex
    this.starProfil = this.$store.state.allProfiles[this.profilIndex].email
    console.log(this.userLoged + this.starProfil)

    axios.get('http://localhost:8081/goldstars/' + this.starProfil)//vrátí pocet hvezd
      .then((response) => {

        this.goldStarsCount = response.data.length

        response.data.forEach((obj) => {//kontrola zda jiz aktualni user tento profil hodnotil
          if ( obj.markerEmail === this.userLoged) {
            this.allreadyMarked = true

          }

        })
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

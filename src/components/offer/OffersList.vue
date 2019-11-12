<template>
<v-row>
<OfferListItem class="item" v-for="( item, index ) in offers"/>

</v-row>
</template>

<script>
import axios from 'axios'
import OfferListItem from '@/components/offer/OfferListItem.vue'
export default {
  name: 'OffersList',

  data() {
    return {
      userLoged: null,
      profilIndex: null,
      offers: [1, 2, 3]
    }
  },
  methods: {
    goldStarIncrement() {
      if (this.starProfil === this.userLoged) {
        alert("nelze hodnoti sám sebe")
      } else if (this.allreadyMarked) {
        alert("tento profil jste jiz hodnotil")
      } else {

        this.allreadyMarked = true //po ohodnoceni vybarvi hvezdu
        this.goldStarsCount++ //po ohodnoceni hned inkrementuje pocet hvezd

        axios.post('http://localhost:8081/goldstars?ownerEmail=' + this.starProfil + '&markerEmail=' + this.userLoged) //vrátí aktuální profil
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
      if (this.allreadyMarked) {
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

    axios.get('http://localhost:8081/goldstars/' + this.starProfil) //vrátí pocet hvezd
      .then((response) => {

        this.goldStarsCount = response.data.length

        response.data.forEach((obj) => { //kontrola zda jiz aktualni user tento profil hodnotil
          if (obj.markerEmail === this.userLoged) {
            this.allreadyMarked = true

          }

        })
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
OfferListItem
  }
}
</script>

<style scoped>
.item {
  cursor: pointer;
}
</style>

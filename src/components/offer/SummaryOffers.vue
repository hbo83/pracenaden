<template>
<div class="summaryOffers">
    <v-container fluid>
      <v-row>
        <v-col v-if="offer.showOffer" class="col-4" v-for="(offer, index) in offers">
        <Offer :index="index" :profileDatas="offers[index]" />
      </v-col>
      </v-row>
    </v-container>
</div>
</template>

<script>
import Offer from '@/components/offer/Offer.vue'
import axios from 'axios';


export default {
  name: 'SummaryOffers',
  data() {
    return {
      index: null,//index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles
      offers: null//pole objektu offers u db
    }
  },
  methods: {

  },
  computed: {

  },
  beforeMount() {
      axios.get('http://localhost:8081/offers/')
        .then((response) => {
          //osetrit vyjimku kdyz jeste nema profil vyplnenej
         this.offers = response.data
          // this.price = response.data[this.$route.params.index].price;
          // this.aboutOffer = response.data[this.$route.params.index].aboutOffer;
          // this.category = response.data[this.$route.params.index].category;
          // this.selectedCategoryItems = response.data[this.$route.params.index].category;
          // this.currency = response.data[this.$route.params.index].currency;
          // this.showOffer = response.data[this.$route.params.index].showOffer;
          // this.title = response.data[this.$route.params.index].title;
          // console.log(this.offers)
        })
        .catch((error) => {
          console.log(error);
        });
  },
  mounted() {

  },
  components: {
    Offer
  }
}
</script>

<style scoped>
.summaryOffers {
  width: 100%;
  height: auto;
  padding: 0 10px 0 45px;
}
</style>

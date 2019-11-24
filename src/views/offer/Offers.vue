<template>
<v-app>
  <div class="offers">
    <Header color="#FFB6C1"/>
    <OfferFiltering></OfferFiltering>
    <SummaryOffers />

  </div>
</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import OfferFiltering from '@/components/offer/OfferFiltering.vue'
import SummaryOffers from '@/components/offer/SummaryOffers.vue'

export default {
  name: 'Offers',
  components: {
    Header,
    OfferFiltering,
    SummaryOffers

  },
  created() {
    this.$store.dispatch("fetchOffers").then(() => {
      console.log("This would be printed after dispatch!!")
    })

  },
}
</script>

<style scoped>
.offers {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}
</style>

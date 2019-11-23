<template>
<v-app>
  <div class="offers">
    <Header2 color="#FFB6C1"/>
    <Filtering></Filtering>
    <SummaryOffers />

  </div>
</v-app>
</template>

<script>
// @ is an alias to /src
import Header2 from '@/components/Header2.vue'
import Filtering from '@/components/Filtering.vue'
import SummaryOffers from '@/components/offer/SummaryOffers.vue'

export default {
  name: 'Offers',
  components: {
    Header2,
    Filtering,
    SummaryOffers

  },
  created() {
    // this.$store.dispatch("fetchUser").then(() => {
    // console.log("This would be printed after dispatch!!")
   // })

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

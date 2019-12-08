<template>
<!-- <v-app> -->
<div>
  <Header color="#FFB6C1"/>
  <NavBar path="offeredit">
  </NavBar>
  <h2>Nová poptávka</h2>
  <OfferForm :newOffer="true"/>
</div>
<!-- </v-app> -->
</template>

<script>
// @ is an alias to /src
import Header from '@/components/global/Header.vue'
import NavBar from '@/components/global/NavBar.vue'
import OfferForm from '@/components/offer/OfferForm.vue'

export default {
  name: 'OfferNewItem',
  data: () => ({

  }),
  components: {
    Header,
    NavBar,
    OfferForm
  },
  mounted() {

  }
}

</script>

<style scoped>
h2 {
  text-align: center;
}

</style>

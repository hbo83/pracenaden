<template>
<!-- <v-app> -->
<div>
  <Header color="#FFB6C1"/>
  <NavBar path="offers">
    <v-btn to="/offernewitem">Poptat pomocníka</v-btn>
  </NavBar>
  <h2>Seznam Vašich poptávek</h2>
  <hr />
  <OffersList />
</div>
<!-- </v-app> -->
</template>

<script>
// @ is an alias to /src
import Header from '@/components/global/Header.vue'
import NavBar from '@/components/global/NavBar.vue'
import OffersList from '@/components/offer/OffersList.vue'

export default {
  name: 'OfferEdit',
  data: () => ({

  }),
  components: {
    Header,
    NavBar,
    OffersList


  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}

</style>

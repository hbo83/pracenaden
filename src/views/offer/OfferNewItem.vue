<template>
<!-- <v-app> -->
<div>
  <Header color="pink" app></Header>
  <NavBar path="offeredit">
  </NavBar>
  <h2>Nová poptávka</h2>
  <OfferForm />
</div>
<!-- </v-app> -->
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
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

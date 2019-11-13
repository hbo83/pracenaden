<template>
<v-app>
  <Header color="pink"></Header>
  <NavBar>
    <v-btn>Poptat pomocníka</v-btn>
  </NavBar>
  <h2>Seznam Vašich poptávek</h2>
  <OffersList />

</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
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
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}

.goldBorder {
  border: 5px solid gold
}

h3 {
  color: pink;
  text-align: center;
}

h4 {
  text-align: left;
}
</style>
<style>


</style>

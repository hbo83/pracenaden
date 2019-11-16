<template>
<v-row>
  <OfferListItem class="item" v-for="( item, index ) in offers" :index="index" />

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
      offers: [],
      index: null
    }
  },
  methods: {

  },
  computed: {

  },
  mounted() {
    this.userLoged = this.$store.state.userLoged
    axios.get('http://localhost:8081/offers/' + this.userLoged) //vrátí vytvorene offers
      .then((response) => {
        this.offers = response.data
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

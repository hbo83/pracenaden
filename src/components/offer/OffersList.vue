<template>
<v-row justify="center">
  <OfferListItem class="item" v-for="( item, index ) in offers" :index="index" :offers="offers"/>
  <h2 v-if="noOffer">Nemáte žádnou poptávku na pomocníka, pokud potřebujete s něčím pomoct, klikněte na tlačítko "Poptat pomocníka"</h2>
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
      offers: [],//naplní se pole offers
      index: null,
      noOffer: null//kdyz je tru, pak se zobrazi h2 výše
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
        if(response.data.length === 0) {//kontrola zda je v DB nejaka nabidka
          this.noOffer = true
        }
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

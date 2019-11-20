<template>
<v-col cols="2" @click="toOffer">
  <v-card>
    <v-card-title>
      titulek: {{offers[index].title}}
    </v-card-title>
    <v-card-text>
      vystaveno:
    </v-card-text>
    <v-card-text>
      konci:
    </v-card-text>
  </v-card>
</v-col>
</template>

<script>
import axios from 'axios'
export default {
  name: 'OfferListItem',
props: {
  index: { //index predany z parent komponenty summary
    type: Number,
    required: true
  },
  offers: {
    type: Array,
    required: true
  }
},
  data() {
    return {
      userLoged: null,
      profilIndex: null,

    }
  },
  methods: {
    toOffer() {
      this.$router.push('/offereditform/' + this.index)
      this.$store.commit('set_currentOfferIndex', this.index)//nastavi index aktualni otevreny nabidky ve store, slouzi k ulozeni fotek do slozky offers
    }
  },
  computed: {

  },
  mounted() {

  },
  components: {

  }
}
</script>

<style scoped>

</style>

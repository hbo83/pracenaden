<template>
<v-col cols="2" @click="toOffer">
  <v-card>
    <v-card-title>
      titulek
    </v-card-title>
    <v-card-text>
      vystaveno dne
    </v-card-text>
    <v-card-text>
      konci dne
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

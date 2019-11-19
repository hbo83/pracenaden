<template>
<v-col class="col-12">

  <v-card height="367px">
    <v-card class="">
      <v-card-title max-width="50%">Detail poptávky:</v-card-title>
    </v-card>
    <v-card-text id="aboutOffer" style="text-align: left; color: green;"></v-card-text>
  </v-card>
</v-col>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AboutOffer',
  data() {
    return {
      aboutOffer: '', //aboutMe content
      currentOffer: {}
    }
  },
  methods: {

  },
  computed: {

  },
  beforeMount() {
    this.aboutOffer = this.$store.state.currentOffer.aboutOffer//naplni aboutOffer ze storu
  },
  mounted() {
    document.getElementById("aboutOffer").innerHTML = this.aboutOffer//vyplni div i s html znaky pro formatovani textu
  }
}
</script>

<style scoped>

</style>

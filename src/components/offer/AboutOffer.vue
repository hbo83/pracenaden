<template>
  <v-card>
    <v-card>
      <v-card-title>Detail poptávky:</v-card-title>
    </v-card>
    <v-card-text id="aboutOffer" style="text-align: left; color: green;"></v-card-text>
  </v-card>

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

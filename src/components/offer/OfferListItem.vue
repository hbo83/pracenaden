<template>
<v-col cols="2">
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

  data() {
    return {
      userLoged: null,
      profilIndex: null,

    }
  },
  methods: {

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

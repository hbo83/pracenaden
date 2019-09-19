<template>
<!-- <v-app> -->
<v-container>
  <v-row no-gutters>
    <v-col cols="4" sm="4">
      <p>{{ this.$store.state.summaryData }} 123</p>
      <p>{{ getSummaryData }} 123</p>
    </v-col>
  </v-row>
</v-container>

<!-- </v-app> -->
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Prefetch2',
  // async getInitialData({ store, route }) {
  //   await store.dispatch('getSummaryData', route.params.home)
  // },

  

  computed: {
    // ...mapState(['loged'])
     getSummaryData() {
       return this.$store.state.summaryData
     }
  }
}
</script>

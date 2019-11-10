<template>
<v-app>
  <div class="info">
    <Header></Header>
    <NavBar />
    <v-card>
      {{op}}
    </v-card>
  </div>
</v-app>
</template>

<script>

import Header from '@/components/Header.vue'
import NavBar from '@/components/NavBar.vue'
import op from '@/data/op.json'

export default {
  name: 'home',
  data() {
    return {
      op: op
    }
  },
  components: {
    Header,
    NavBar

  },
  // created() {
  //   this.$store.dispatch("fetchUser").then(() => {
  //   console.log("This would be printed after dispatch!!")
  //  })
  //
  // },
}
</script>

<style scoped>

</style>

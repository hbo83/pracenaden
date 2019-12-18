<template>
<v-app>
  <div>
    <Header color="#40a30d"></Header>
    <NavBar path="" color="#90e4f1" nav="info"/>
    <div style="margin-top: 100px">
    <InfoExpansion />
  </div>
  </div>
</v-app>
</template>

<script>

import Header from '@/components/global/Header.vue'
import NavBar from '@/components/global/NavBar.vue'
import InfoExpansion from '@/components/info/InfoExpansion.vue'
import op from '@/data/op.json'

export default {
  name: 'home',
  data() {
    return {

    }
  },
  components: {
    Header,
    InfoExpansion,
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

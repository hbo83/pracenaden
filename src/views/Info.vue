<template>
<v-app>
  <div>
    <Header color="#40a30d"></Header>
    <InfoExpansion />
  </div>
</v-app>
</template>

<script>

import Header from '@/components/Header.vue'
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
    InfoExpansion

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

<template>
  <v-app>
  <div class="home">
<Header></Header>
<Filtering></Filtering>
<Summary></Summary>
  </div>
</v-app>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Filtering from '@/components/Filtering.vue'
import Summary from '@/components/Summary.vue'

export default {
  name: 'home',
  components: {
    Header,
    Filtering,
    Summary
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}
</style>

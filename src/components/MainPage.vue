<template>
  <div class="mainPage">
    <!-- <v-app> -->
    <Header></Header>
    <Filtering></Filtering>
    <Summary></Summary>
  <!-- </v-app> -->
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Filtering from '@/components/Filtering.vue'
import Summary from '@/components/Summary.vue'
export default {
  name: 'MainPage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Header,
    Filtering,
    Summary
  },
  mounted() {
    // console.log('MainPage mounted')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mainPage {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}
</style>

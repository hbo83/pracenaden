<template>
  <div class="mainPage">
    <Header></Header>
    <Filtering></Filtering>
    <Summary></Summary>
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

<style scoped>
.mainPage {
  width: 100%;
  height: auto;
}
</style>

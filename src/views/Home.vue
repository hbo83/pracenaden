<template>
  <v-app>
  <div class="home">
<Header></Header>
<Filtering></Filtering>
<Summary></Summary>
<Prefetch2 />
  </div>
</v-app>
</template>
<!-- componentDidMount() - tato metoda je vyvolana ihned po namountovani komponenty, pouziva se pro pripady kdy chceme inicializovat nejaky data ze serveru,pak by se mela nejak odhlasit metodou componentWillUnmount()
- bacha na setState() v tyhle metode ptze by to mohlo vyvolat dvojity vykreslovani nebo tak neco

componentWillUnmount() - tato metoda je vyvolana tesne pretim nez bude komponenta unmounted a destroyed, provadi se pro vycisteni casovaci, sitovych pozadavku atd. co byli vyvolany v metode componentDidMount()
- setState() je zde zbytecny protoze komponenta uz nebude renderovana -->

<!-- nahraju prvni data do home a zbytek na pozadi do store -->
<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import Filtering from '@/components/Filtering.vue'
import Summary from '@/components/Summary.vue'
import Prefetch2 from '@/components/Prefetch2.vue'
export default {
  fetch ({ store, params }) {
    return axios.get('http://localhost:8081/profiles')
    .then((res) => {
      store.commit('setSummaryData', res.data)
    })
  },
  name: 'home',
  components: {
    Header,
    Filtering,
    Summary,
    Prefetch2
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

<template>
<v-app>
<div class="home">
  <Header color="#90e4f1"/>
  <ProfilFiltering></ProfilFiltering>
  <!-- <Summary></Summary>
 -->
 <v-row>
   <v-col cols="12">
     <ProfilSum />
  </v-col>
</v-row>
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
import Header from '@/components/global/Header.vue'
import ProfilFiltering from '@/components/profil/ProfilFiltering.vue'
// import Summary from '@/components/Summary.vue'
import ProfilSum from '@/components/profil/ProfilSum.vue'

export default {
  name: 'Profil',
  components: {
    Header,
    ProfilFiltering,
    ProfilSum

  },
  created() {
    this.$store.dispatch("fetchUser").then(() => {
      console.log("This would be printed after dispatch!!")
    })

  },
  mounted() {
    // console.log('nyní mounted')
    //ne vsechno musi byt ve store, nechal bych kazdou komponentu at si posila svoje requesty
    // console.log(this.profilePath)
  },
  beforeCreate() {
    // console.log('nyni beforeCreate')
  },
  beforeUpdate() {
    // console.log('nyní beforeupdate')
  },
  updated() {
    // console.log('nyní updated')
  },
  activated() {
    // console.log('nyní activated')
  },
}
</script>

<style scoped>
.home {
  width: 100%;
  height: auto;
  /* border: 1px solid black; */
}
</style>

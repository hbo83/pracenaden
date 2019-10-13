<template>
<div class="summary">
  <!-- zde deklaruji props direktivou v-bind. props promenna je profileDatas dale definovana v Profil komponente.  -->
  <!-- index z cyklu v-for jsem bindnul na promenou index v datech a ten jsem zas bindnul do props jako index objektu v poli, ktere se predava do komponenty profil -->
  <SlotHelp>
    <h2 slot="nadpis">{{ msg }}</h2>
    <p>paragraf</p>
  </SlotHelp>
  <v-app>

    <v-container fluid>
      <v-row align="center">
        <Profil v-show="!profil.hideProfil" v-for="(profil, index) in summaryData" v-bind:index="index" v-bind:profileDatas="summaryData[index]" />
<!-- <p>{{getSummaryData}}</p> -->
<!-- <v-btn @click="storeSummaryCommit(summaryData)">click</v-btn> -->
      </v-row>
    </v-container>
  </v-app>


</div>
</template>

<script>
import Profil from '@/components/Profil.vue'
import axios from 'axios';
import SlotHelp from '@/components/SlotHelp.vue'
export default {
  name: 'Summary',
  // async getInitialData({ store, route }) {
  //   await store.dispatch('getSummaryData', route.params.home)
  // },
  data() {
    return {
      msg: 'PraceNaDen',
      profiles: [],
      index: null,
      summaryData: []

    }
  },
  methods: {
    storeSummaryCommit: function(data) {
      this.$store.commit('setSummaryData', data)
    }
  },
  computed: {
    getSummaryData() {
      return this.$store.state.summaryData
    }
  },
  beforeMount() {
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    // console.log(this.getSummaryData)
    axios.get('http://localhost:8081/profiles')
      .then((response) => {
        console.log(response.data);
        this.summaryData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    // console.log('Summary mounted')
    //nestaci abych jen commitnul store v beforeMount, pokud tam chci ty data dostat, tak to musim provest v mounted a funkce pro zobrazeni tech dat v computed
    axios.get('http://localhost:8081/profiles')
      .then((response) => {
        this.$store.commit('setSummaryData', this.summaryData)
      })
      .catch((error) => {
        console.log(error);
      });
      // this.$store.state.serverData.then(alert(456))
      console.log(this.$store.state.serverData)
      

  },
  components: {
    Profil,
    SlotHelp
  }
}
</script>

<style scoped>
.summary {
  width: 100%;
  height: 600px;
  /* background-color: pink; */
  padding: 0 10px 0 45px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

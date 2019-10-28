<template>
<div class="summary">
  <!-- zde deklaruji props direktivou v-bind. props promenna je profileDatas dale definovana v Profil komponente.  -->
  <!-- index z cyklu v-for jsem bindnul na promenou index v datech a ten jsem zas bindnul do props jako index objektu v poli, ktere se predava do komponenty profil -->
  <!-- <SlotHelp>
    <h2 slot="nadpis">{{ msg }}</h2>
    <p>paragraf</p>
  </SlotHelp> -->
  <!-- <v-app> -->

    <v-container fluid>
      <v-row>
        <v-col class="col-4" v-for="(profil, index) in getAllProfiles">
        <Profil v-show="!profil.hideProfil" :index="index" :profileDatas="getAllProfiles[index]" />
      </v-col>
      </v-row>
    </v-container>
  <!-- </v-app> -->
<Help />

</div>
</template>

<script>
import Profil from '@/components/Profil.vue'
import axios from 'axios';
import SlotHelp from '@/components/SlotHelp.vue'
import Help from '@/components/Help.vue'
export default {
  name: 'Summary',
  data() {
    return {
      msg: 'PraceNaDen',
      index: null//index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles

    }
  },
  methods: {
    // storeSummaryCommit: function(data) {
    //   this.$store.commit('setSummaryData', data)
    // }
  },
  computed: {
    getAllProfiles() {//vraci pole profilu
      return this.$store.state.allProfiles
    }
  },
  beforeMount() {
    //kdyz jsem priradil promenoou jen do mount tak se nepredala v props, ptze se priradila az po tom co byl namountovanej Profil
    // console.log(this.getSummaryData)
    // axios.get('http://localhost:8081/profiles')
    //   .then((response) => {
    //     console.log(response.data);
    //     this.summaryData = response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  },
  mounted() {
    // console.log('Summary mounted')
    //nestaci abych jen commitnul store v beforeMount, pokud tam chci ty data dostat, tak to musim provest v mounted a funkce pro zobrazeni tech dat v computed
    // axios.get('http://localhost:8081/profiles')
    //   .then((response) => {
    //     this.$store.commit('setSummaryData', this.summaryData)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //   // this.$store.state.serverData.then(alert(456))
    //   console.log(this.$store.state.serverData)


  },
  components: {
    Profil,
    SlotHelp,
    Help
  }
}
</script>

<style scoped>
.summary {
  width: 100%;
  height: auto;
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

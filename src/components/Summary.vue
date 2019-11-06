<template>
<div class="summary">
    <v-container fluid>
      <v-row>
        <v-col class="col-4" v-for="(profil, index) in getAllProfiles">
        <Profil v-show="!profil.hideProfil" :index="index" :profileDatas="getAllProfiles[index]" />
      </v-col>
      </v-row>
    </v-container>
<!-- <Help /> -->

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

  },
  computed: {
    getAllProfiles() {//vraci pole profilu
      return this.$store.state.allProfiles
    }
  },
  beforeMount() {

  },
  mounted() {

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
  padding: 0 10px 0 45px;
}
</style>

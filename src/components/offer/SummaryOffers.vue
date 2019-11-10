<template>
<div class="summaryOffers">
    <v-container fluid>
      <v-row>
        <v-col class="col-4" v-for="(profil, index) in getAllProfiles">
        <ProfilOffer v-show="!profil.hideProfil" :index="index" :profileDatas="getAllProfiles[index]" />
      </v-col>
      </v-row>
    </v-container>
<!-- <Help /> -->

</div>
</template>

<script>
import ProfilOffer from '@/components/offer/ProfilOffer.vue'
import axios from 'axios';


export default {
  name: 'SummaryOffers',
  data() {
    return {
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
    ProfilOffer
  }
}
</script>

<style scoped>
.summaryOffers {
  width: 100%;
  height: auto;
  padding: 0 10px 0 45px;
}
</style>

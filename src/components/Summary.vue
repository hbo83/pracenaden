<template>
<div class="summary">
  <v-container fluid>
    <v-row>
      <v-col cols="5">
        <v-row>
          <v-col class="col-12" v-for="(profil, index) in getAllProfiles">
            <Profil v-show="!profil.hideProfil" :index="index" :profileDatas="getAllProfiles[index]" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="5">
        <ProfilDetail />
      </v-col>
    </v-row>
  </v-container>




</div>
</template>

<script>
import Profil from '@/components/Profil.vue'
import axios from 'axios';
import ProfilDetail from '@/components/profil/ProfilDetail.vue'

export default {
  name: 'Summary',
  components: {
    ProfilDetail
  },
  data() {
    return {
      index: null //index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles
    }
  },
  methods: {

  },
  computed: {
    getAllProfiles() { //vraci pole profilu
      return this.$store.state.allProfiles
    }
  },
  beforeMount() {

  },
  mounted() {

  },
  components: {
    Profil,
    ProfilDetail
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

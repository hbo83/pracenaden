<template>
<div class="summary">
  <v-container fluid>
    <v-row>
      <v-col cols="5" style="overflow: scroll; height: 800px;overflow-x: hidden;">
        <v-row>
          <v-col class="col-12" v-for="(profil, index) in getAllProfiles">
            <Profil v-show="!profil.hideProfil" :index="index" :profileDatas="getAllProfiles[index]" />
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="7" class="py-0">
        <v-row>
          <v-col cols="7" class="py-0">
            <ProfilAboutMe />
            <v-row>
              <v-col>
                <Score />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="5" class="py-0">
            <ProfilColumn />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <ProfilGalery />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>




</div>
</template>

<script>
import Profil from '@/components/profil/Profil.vue'
import axios from 'axios';
import Score from '@/components/profil/Score.vue'
import ProfilAboutMe from '@/components/profil/ProfilAboutMe.vue'
import ProfilColumn from '@/components/profil/ProfilColumn.vue'
import ProfilGalery from '@/components/profil/ProfilGalery.vue'
export default {
  name: 'Summary',
  components: {
    Profil,
    ProfilAboutMe,
    ProfilColumn,
    Score,
    ProfilGalery

  },
  data() {
    return {
      index: null //index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles
    }
  },
  methods: {

  },
  computed: {//computed se bude pocitat jen v tom pripade ze nekde bude v sablone pouzito!!!
    getAllProfiles() { //vraci pole profilu
      return this.$store.state.allProfiles
    }
  },
  beforeMount() {

  },
  mounted() {

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

<template>
<div class="summary">
  <v-container fluid>
    <v-row>
      <v-col cols="4" style="overflow: scroll; height: 800px;overflow-x: hidden;">
        <v-row>
          <v-col class="col-12" v-for="(profil, index) in getAllProfiles">
            <Profil v-show="!profil.hideProfil" :index="index" :profileDatas="getAllProfiles[index]" />
          </v-col>
        </v-row>
      </v-col>

      <transition name="slide-x-transition">
      <v-col cols="7" class="py-0" v-if="show" style="font-size: x-large">
        <Score>
          <b>{{transitionAndName}}</b>
        </Score>  

        <v-row>
          <v-col cols="7" class="py-5">
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
    </transition>
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
      index: null, //index predavam do child komponenty Profil, kde se pouzije jako index objektu v poli allProfiles
      show: true,//true or false pro transition
      currentProfile: {}//vrati curent profile ale ted nepouzuvcam
    }
  },
  methods: {

  },
  computed: { //computed se bude pocitat jen v tom pripade ze nekde bude v sablone pouzito!!!
    getAllProfiles() { //vraci pole profilu
      return this.$store.state.allProfiles
    },
    transitionAndName() {//zajisti transition a vrati jmeno
      this.show = false
      setTimeout(() => {
        this.show = true
      },2)
      return this.$store.state.currentProfile.name
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}
</style>

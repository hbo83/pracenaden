<template>
<div class="profilSum" style="position: relative; top: 120px">

  <v-row style="overflow: auto!important">
    <v-col sm="12" xs="12" class="col-12 py-1" v-for="(profil, index) in allProfiles">
      <Profil v-show="!profil.hideProfil" :index="index" :profileDatas="allProfiles[index]"/>
    </v-col>

  </v-row>
</div>
</template>

<script>
import axios from 'axios'
import Profil from '@/components/profil/Profil.vue'
export default {
  name: 'ProfilSum',
  components: {
    Profil
  },
  data() {
    return {
      index: null,
      dialog: false,
      allProfiles: []
    }
  },

  methods: {

  },
  computed: { //computed se bude pocitat jen v tom pripade ze nekde bude v sablone pouzito!!!
    getAllProfiles() { //vraci pole profilu
      console.log(this.$store.state.allProfiles)
      return this.$store.state.allProfiles
    }
  },
  beforeMount() {
    axios.get('http://10.0.0.22:8081/profiles')
      .then((response) => {
        console.log(response.data)
        this.allProfiles = response.data
        // alert(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {

  }

}
</script>

<style scoped>

</style>

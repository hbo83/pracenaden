<template>
<!-- <v-container class="filter" fluid> -->
<div style="position: fixed; top: 40px; z-index: 99; background: #90e4f1; border-bottom-left-radius: 25px; border-bottom-right-radius: 25px;" >
  <v-row align="center" style="height: 73px;" justify="center" class="px-4">
    <!-- <v-col cols="4">
      Nalezeno: {{dataCount}} položek
    </v-col> -->
      <v-col class="d-flex my-0 py-0" cols="6">
        <v-select
          v-model="job"
          :items="jobItems"
          label="Obor, Profese"
          solo
          append-icon="build"
          v-on:change="setJob"
          dense
          :hint="get_dataCount"
          persistent-hint
        ></v-select>
      </v-col>

      <v-col class="" cols="6">
        <v-select
          v-model="city"
          :items="cityItems"
          label="Místo"
          solo
          append-icon="map"
          v-on:change="setCity"
          dense
        ></v-select>
      </v-col>

    </v-row>
    <!-- <v-row>
      <v-col cols="12" align="center" class="py-0 my-0">
        <span>Nalezeno: {{dataCount}} položek</span>
      </v-col>
    </v-row> -->
  <!-- </v-container> -->
  </div>
</template>

<script>
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import axios from 'axios'
export default {
  name: 'ProfilFiltering',
  data() {
    return {
      job: 'Vše',//selected job from job filter
      city: 'Vše',//selected city from city filter
      jobItems: categories,//items for job selectBox
      cityItems: cities,//items city job selectBox
      dataCount: null//vrati pocet nalezenych objektu po filtraci
    }
  },
  methods: {
    setJob( job ) {//nastavi filter job ve store
      this.$store.commit('setJobFilter', job )
      this.changeAllProfiles()
    },
    setCity( city ) {//nastavi filter city ve store
      this.$store.commit('setCityFilter', city )
      this.changeAllProfiles()
    },
    changeAllProfiles ( data ) {//zmeni allProfilies a tim se znovu vykersli Summary

      axios.get('http://10.0.0.22:8081/profilesFiltered?city=' + this.city + '&job=' + this.job)//vrátí aktuální profil
        .then((response) => {
          this.$store.commit('setAllProfiles', response.data)
          this.dataCount = response.data.length
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  computed: {
     get_dataCount() {
       return "Nalezeno:" + this.dataCount + "položek"
     }
  },
  mounted() {
    this.changeAllProfiles()//naplní nalezeno položek
  }
}
</script>

<style scoped>
.filter {
  padding: 0 10px 0 45px;
}

</style>

<template>
<!-- <v-container class="filter" fluid> -->
<div style="width: 100%; margin: auto">
  <v-row align="center" style="height: 73px;" justify="center">
    <!-- <v-col cols="4">
      Nalezeno: {{dataCount}} položek
    </v-col> -->
      <v-col class="d-flex" cols="6">
        <v-select
          v-model="job"
          :items="jobItems"
          label="Obor, Profese"
          solo
          prepend-icon="build"
          v-on:change="setJob"
          dense
        ></v-select>
      </v-col>

      <v-col class="" cols="6">
        <v-select
          v-model="city"
          :items="cityItems"
          label="Místo"
          solo
          prepend-icon="map"
          v-on:change="setCity"
          dense
        ></v-select>
      </v-col>

    </v-row>
    <v-row>
      <v-col cols="12" align="center">
        <span>Nalezeno: {{dataCount}} položek</span>
      </v-col>
    </v-row>
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

<template>
<v-container class="filter" fluid>
  <v-row align="center">
      <v-col class="d-flex" cols="5">
        <v-select
          v-model="job"
          :items="jobItems"
          label="Obor, Profese"
          outlined
          prepend-icon="build"
          v-on:change="setJob"

        ></v-select>
      </v-col>

      <v-col class="" cols="5">
        <v-select
          v-model="city"
          :items="cityItems"
          label="Místo"
          outlined
          prepend-icon="map"
          v-on:change="setCity"

        ></v-select>
      </v-col>

    <v-col align="center" class="pt-2" cols="2" style="min-height:98px;">
      <v-btn @click="changeAllProfiles( { hideProfil: false} )" color="primary" x-large >Filtrovat</v-btn>
    </v-col>

    </v-row>
  </v-container>
</template>

<script>
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import axios from 'axios'
export default {
  name: 'Filtering',
  data() {
    return {
      job: 'Vše',//selected job from job filter
      city: 'Vše',//selected city from city filter
      jobItems: categories,//items for job selectBox
      cityItems: cities//items city job selectBox
    }
  },
  methods: {
    setJob( job ) {//nastavi filter job ve store
      this.$store.commit('setJobFilter', job )
    },
    setCity( city ) {//nastavi filter city ve store
      this.$store.commit('setCityFilter', city )
    },
    changeAllProfiles ( data ) {//zmeni allProfilies a tim se znovu vykersli Summary

      axios.get('http://localhost:8081/profilesFiltered?city=' + this.city + '&job=' + this.job)//vrátí aktuální profil
        .then((response) => {
          this.$store.commit('setAllProfiles', response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    },

  },
  mounted() {

  }
}
</script>

<style scoped>
.filter {
  padding: 0 10px 0 45px;
}

</style>

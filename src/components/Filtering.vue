<template>
<v-container class="filter" fluid>
  <v-row align="center">
      <v-col class="d-flex" cols="5">
        <v-select
          v-model="job"
          :items="itemsCategories"
          label="Obor, Profese"
          outlined
          prepend-icon="build"
          v-on:change="setJob"
        ></v-select>
      </v-col>

      <v-col class="" cols="5">
        <v-select
          v-model="city"
          :items="itemsCities"
          label="Místo"
          outlined
          prepend-icon="map"
          v-on:change="setCity"
        ></v-select>
      </v-col>

    <v-col align="center" class="pa-0" cols="2">
      <v-btn @click="changeAllProfiles( { hideProfil: false} )" color="primary" >Filtrovat</v-btn>
    </v-col>

    </v-row>
  </v-container>
<!-- </v-app> -->
<!-- </div> -->
</template>

<script>
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import axios from 'axios'
export default {
  name: 'Filtering',
  data() {
    return {
      job: '',
      city: '',
      e1: 'Florida',
        e4: null,
        itemsCategories: categories,
        itemsCities: cities
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

      axios.get('http://localhost:8081/profiles/' + this.city)//vrátí aktuální profil
        .then((response) => {
          console.log(response.data)
          this.$store.commit('setAllProfiles', response.data)
          // this.thisProfil = response.data[0]
        })
        .catch((error) => {
          console.log(error);
        });

    }
  },
  mounted() {
    // console.log('Filtering mounted')
  }
}
</script>

<style scoped>
.filter {
  padding: 0 10px 0 45px;
}

h1,
h2 {
  /* font-weight: normal; */
}

a {
  color: #42b983;
}
</style>

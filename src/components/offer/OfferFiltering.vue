<template>
<v-container class="filter" fluid>
  <v-row align="center">
      <v-col class="d-flex" cols="3">
        <v-select
          v-model="category"
          :items="categoryItems"
          label="Kategorie"
          solo
          prepend-icon="category"
          v-on:change="setCategory"

        ></v-select>
      </v-col>

      <v-col class="" cols="3">
        <v-select
          v-model="city"
          :items="cityItems"
          label="Místo"
          solo
          prepend-icon="map"
          v-on:change="setCity"

        ></v-select>
      </v-col>

    <v-col class="mt-n8" cols="1">
      <v-btn fab @click="changeAllOffers( { hideProfil: false} )" color="primary" small ><v-icon>autorenew</v-icon></v-btn>
    </v-col>

    </v-row>
  </v-container>
</template>

<script>
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
import axios from 'axios'
export default {
  name: 'OfferFiltering',
  data() {
    return {
      category: 'Vše',//selected job from job filter
      city: 'Vše',//selected city from city filter
      categoryItems: categories,//items for job selectBox
      cityItems: cities//items city job selectBox
    }
  },
  methods: {
    setCategory( category ) {//nastavi filter job ve store
      this.$store.commit('setCategoryFilter', category )
    },
    setCity( city ) {//nastavi filter city ve store
      this.$store.commit('setCityFilter', city )
    },
    changeAllOffers( data ) {//zmeni allProfilies a tim se znovu vykersli Summary

      axios.get('http://localhost:8081/offersFiltered?city=' + this.city + '&category=' + this.category)//vrátí aktuální profil
        .then((response) => {
          this.$store.commit('setAllOffers', response.data)
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

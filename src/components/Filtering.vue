<template>
  <!-- <div style="height: 96px; overflow-y: hidden;"> -->
  <!-- <v-app> -->
<v-container class="filter" fluid>
  <v-row align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="itemsCategories"
          label="Obor, Profese"
          outlined
          prepend-icon="build"
        ></v-select>
      </v-col>

      <v-col class="d-flex" cols="6" sm="6">
        <v-select
          :items="itemsCities"
          label="Místo"
          outlined
          prepend-icon="map"
        ></v-select>
      </v-col>


    </v-row>
  </v-container>
<!-- </v-app> -->
<!-- </div> -->
</template>

<script>
import categories from '@/data/categories.js'
import cities from '@/data/cities.js'
export default {
  name: 'Filtering',
  data() {
    return {
      msg: 'PraceNaDen',
      e1: 'Florida',
        e4: null,
        itemsCategories: categories,
        itemsCities: cities
    }
  },
  methods: {

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

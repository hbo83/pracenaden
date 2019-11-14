<template>
<div id="app">
  <v-app><!--kdyz mam zde v-app tak nemusim kazdou komponentu tim obalovat a pisou ze nema byt na jedne strance vice v-app-->
    <v-content><!--When using vue-router it is recommended that you place your views inside v-content.-->
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</div>
</template>

<script>
// import axios from 'axios'
// export default {
//   name: 'w',
//   mounted: {
// axios.get('http://localhost:8081/profiles')
// .then((response) => {
//   console.log(response.data)
//   // this.$store.commit('setSummaryData', response)
// })
// .catch((error) => {
//   console.log(error);
// });
//
//   }
// }
</script>

<style>

</style>

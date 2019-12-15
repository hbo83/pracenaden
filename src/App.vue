<template>
<div id="app">
  <v-app><!--kdyz mam zde v-app tak nemusim kazdou komponentu tim obalovat a pisou ze nema byt na jedne strance vice v-app-->
    <v-content><!--When using vue-router it is recommended that you place your views inside v-content.-->
      <v-container fluid px-0 py-0>
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
/* html, body {margin: 0; height: 100%; overflow: hidden} */
/* ::-webkit-scrollbar {
    width: 6px;
    background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb {
  background-color: green;
  border-radius: 10px;
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
}
::-webkit-scrollbar-thumb:hover {
  background: #b30000;
} */

</style>

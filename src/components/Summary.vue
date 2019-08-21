<template>
<div class="summary">
  <!-- zde deklaruji props direktivou v-bind. props promenna je profileDatas dale definovana v Profil komponente.  -->
  <!-- index z cyklu v-for jsem bindnul na promenou index v datech a ten jsem zas bindnul do props jako index objektu v poli, ktere se predava do komponenty profil -->
  <v-app>

    <v-container fluid>
      <v-row align="center">
        <Profil v-for="(profil, index) in profiles" v-bind:index="index" v-bind:profileDatas="profiles[index]" />

      </v-row>
    </v-container>
</v-app>


</div>
</template>

<script>
import Profil from '@/components/Profil.vue'
import axios from 'axios';
export default {
  name: 'Summary',
  data() {
    return {
      msg: 'PraceNaDen',
      profiles: [],
      index: null

    }
  },
  methods: {

  },
  mounted() {
    console.log('Summary mounted')

    axios.get('http://localhost:8081/profiles')
      .then((response) => {
        console.log(response.data);
        this.profiles = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    Profil
  }
}
</script>

<style scoped>
.summary {
  width: 100%;
  height: 600px;
  /* background-color: pink; */
  padding: 0 10px 0 45px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

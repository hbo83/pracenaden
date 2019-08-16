<template>
<div class="summary">
  <!-- zde deklaruji props direktivou v-bind. props promenna je profileDatas dale definovana v Profil komponente.  -->
  <Profil v-for="profil in profiles" v-bind:profileDatas="profiles"/>

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
      profiles: []

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
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

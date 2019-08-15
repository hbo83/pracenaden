<template>
<div class="summary">
  <Profil />
  <Profil />
  <Profil />
  <Profil />
  <Profil />
  <Profil />
</div>
</template>

<script>
import Profil from '@/components/Profil.vue'
export default {
  name: 'Summary',
  data() {
    return {
      msg: 'PraceNaDen'

    }
  },
  methods: {

  },
  mounted() {
    console.log('Summary mounted')
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

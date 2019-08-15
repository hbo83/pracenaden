<template>
<div class="avatar">
<!-- <v-icon large>arrow_back</v-icon> -->
<v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
</div>
</template>

<script>
export default {
  name: 'Avatar',
  data() {
    return {
      msg: 'PraceNaDen'

    }
  },
  methods: {

  },
  mounted() {
    console.log('Avatar mounted')
  }
}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: 150px;
  border: 1px solid blue;
  float: left;
  border-radius: 3px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

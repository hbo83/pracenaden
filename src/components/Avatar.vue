<template>
<div class="avatar">
<!-- <v-icon large>arrow_back</v-icon> -->
<div style="margin-bottom: -12px;">
<v-img
          :src="require('../assets/ja.jpg')"
          class="my-3"
          contain
          height="200"
          style="border-radius: 16px; margin-bottom -12px; margin-top: -12px;"
        ></v-img>
</div>
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
  height: 175px;
  /* border: 1px solid blue; */
  float: left;
  border-radius: 3px;
  margin-right: 20px;
  border-radius: 100px;
}

h1,
h2 {
  font-weight: normal;
}

a {
  color: #42b983;
}
</style>

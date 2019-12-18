<template>
<div style="width: 100%; z-index: 99; position: fixed; top: 65px; width: 100%; display: flex">

  <v-btn icon @click="toPath" style="border: 1px solid black">
    <v-icon>keyboard_arrow_left</v-icon>
  </v-btn>


  <v-spacer></v-spacer>
  <!--vyplnuje misto mezi dvema komponentama-->
  <!-- <template v-if="$vuetify.breakpoint.smAndDown"> -->
  <template>
    <span style="display: block; padding-right: 2em; color: #90e4f1">editace</span>
  </template>

</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NavBar',
  props: {
    path: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: false
    }
  },
  data() {
    return {}
  },
  methods: {
    toPath() {
      window.location.href = "http://10.0.0.22:8080/" + this.path;
    },
    // test(){
    //   console.log("testuju")
    //   axios.get('http://localhost:8081/test2')
    //     .then((response) => {
    //
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>

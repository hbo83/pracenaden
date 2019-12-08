<template>
  <!-- <v-app> --><div style="width: 100%; z-index: 99; position: fixed" >
  <v-toolbar style="background-color: #90e4f1; position: fixed; top: 55px; width: 100%">
    <!-- <v-toolbar-title><h1 style="font-size:1em;" @click="homePage">Prácenaden.cz <span style="font-size: 14px">- nabídka a poptávka služeb</span></h1></v-toolbar-title> -->

    <!-- <v-spacer></v-spacer> -->

    <v-toolbar-items>
      <v-btn icon >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn  text to="/offers">Poptávka</v-btn>
      <v-btn  text to="/">Nabídka</v-btn> -->
      <!-- <v-btn  icon @click="toProfilDetail"> -->
        <!-- <v-icon>edit</v-icon> -->
      <!-- </v-btn> -->
      <!-- <v-btn  icon @click="toOfferEdit">
        <v-icon>edit</v-icon>
      </v-btn> -->
      <!-- <v-btn v-if="this.$store.state.userLoged" disabled text>{{ updateUserLoged }}</v-btn> -->
    </v-toolbar-items>
<v-spacer></v-spacer><!--vyplnuje misto mezi dvema komponentama-->
    <!-- <template v-if="$vuetify.breakpoint.smAndDown"> -->
    <template>
      <span>editace</span>
    </template>
  </v-toolbar>


  <!-- <v-container style="position: fixed; top: 100px; z-index: 99; margin-bottom: 100px; background-color:#90e4f1">
  <v-row align="center" justify="space-between">
      <v-col class="mx-4 my-0 py-0" cols="2">
        <v-btn height="40px" width="40px" small color="error" @click="toPath">
          <v-icon large>arrow_back</v-icon>
        </v-btn>


      </v-col>
      <v-col cols="2">
        <slot><h3>editace</h3></slot>
      </v-col>
    </v-row>
  </v-container> -->
<!-- </v-app> --></div>
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
    return {
    }
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

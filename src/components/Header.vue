<template>
<v-container style="padding: 0">
  <v-row :style="{ backgroundColor: color }" no-gutters>
    <!-- <v-row style="background-color:#90e4f1" no-gutters> -->
    <v-col cols="4" sm="4" class="px-6">
      <h1 @click="homePage">Prácenaden.cz</h1>
    </v-col>
    <v-col cols="4" sm="4">
      <v-icon class="loged" @click="toOffers" color="white" x-large dark >money</v-icon>
      <v-icon class="loged" @click="homePage" color="white" x-large dark >face</v-icon>
    </v-col>
    <v-col cols="4" sm="4" class="pt-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon class="loged" @click="toInfo" color="white" large dark v-on="on">info</v-icon>
        </template>
        <span>Tooltip</span>
      </v-tooltip>
      <!-- <v-icon class="loged" @click="toInfo" color="white" large>info</v-icon> -->
      <v-icon class="loged" v-show="updateUserLoged" @click="redirProfilDetail" color="white" large>edit</v-icon>
      <p><b>{{ updateUserLoged }}</b>
        <span>
          <v-icon v-show="!updateUserLoged" class="loged" @click="logIn" color="white" large>account_box</v-icon>
          <v-icon v-show="updateUserLoged" class="loged" @click="logOut" color="white" large>exit_to_app</v-icon>
        </span></p>

    </v-col>
  </v-row>
</v-container>
</template>

<script>
export default {

  name: 'Header',
  data() {
    return {
      userLoged: null,
    }
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: { //vuex state je dobry updatovat v computed

    updateUserLoged() { //return je spravny kdyz beru z vuex
      return this.$store.state.userLoged
    }

  },
  methods: {
    homePage() { //pri kliknuti na logo redirect na homepage
      window.location.href = "http://localhost:8080/";
    },
    logIn() {
      window.location.href = "http://localhost:8080/login";
    },
    toInfo() {
      window.location.href = "http://localhost:8080/info";
    },
    toOffers() {
      window.location.href = "http://localhost:8080/offers";
    },
    logOut() { //logout
      let userLoged = this.$store.state.userLoged
      this.$store.commit('setLogout', null)
      console.log(this.$store.state.userLoged)
      if (userLoged) {
        var txt;
        if (confirm("Opravdu se chcete odhlásit?")) {
          txt = "Nyní jste odhlášeni!";
          window.location.href = "http://localhost:8080/";
          alert(txt);
        }
      }
    },
    redirProfilDetail() { //redirect na editaci profilu
      window.location.href = "http://localhost:8080/profiledit";
    }
  },
  beforeMount() {

  },
  mounted() {

  },
  updated() {

  }
}
</script>

<style scoped>
h1 {
  text-align: left;
  color: white;
  cursor: pointer;
  display: block;
}

.loged {
  float: right;
  margin-right: 28px;
  cursor: pointer;
}

.loged+p {
  text-align: right;
  color: white;
}
</style>

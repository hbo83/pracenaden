<template>
<v-container style="padding: 0">
  <v-row style="background-color:#90e4f1" no-gutters>
    <v-col cols="4" sm="4" class="px-6">
        <h1 @click="homePage">{{ msg }}</h1>
    </v-col>
    <v-col cols="4" sm="4">
    </v-col>
    <v-col cols="4" sm="4" class="pt-3">

        <v-icon class="loged" v-show="updateUserLoged" @click="redirProfilDetail" color="white" large>edit</v-icon>
        <p><b>{{ updateUserLoged }}</b>
          <span>
            <v-icon v-show="!updateUserLoged" class="loged" @click="logIn" to="/login" color="white" large>account_box</v-icon>
            <v-icon v-show="updateUserLoged" class="loged" @click="logOut" to="/login" color="white" large>exit_to_app</v-icon>
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
      msg: 'Pracenaden.cz',
      userLoged: null,
      // loged: false,
      icon: "account_box"
    }
  },
  computed: { //vuex state je dobry updatovat v computed

    updateUserLoged() {//return je spravny kdyz beru z vuex

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
    redirProfilDetail() {//redirect na editaci profilu
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
  margin-right:28px;
  cursor: pointer;
}
.loged + p {
   text-align: right;
   color: white;
}
</style>

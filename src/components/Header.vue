<template>
<v-container style="padding: 0">
  <v-row style="background-color:#90e4f1" no-gutters>
    <v-col cols="4" sm="4" class="px-6">
        <h1 @click="homePage">{{ msg }}</h1>
    </v-col>
    <v-col cols="4" sm="4">
    </v-col>
    <v-col cols="4" sm="4" class="pt-3">

        <v-icon class="loged" v-show="loged || updateLoged" @click="redirProfilDetail" color="white" large>edit</v-icon>
        <p><b>{{ userLoged || updateUserLoged}}</b><span>
            <v-icon class="loged" @click="logOut" to="/login" color="white" large>{{icon}}</v-icon>
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

    updateLoged() {
      return this.$store.state.loged
    },
    updateUserLoged() {
      return this.$store.state.userLoged
    }

  },
  methods: {
    homePage() { //pri kliknuti na logo redirect na homepage
      window.location.href = "http://localhost:8080/";
    },
    logedYesNo() { //kdyz je nekdo zalogovany, tak se ukaze ikonka odhlasit, kdyz ne tak ikonka prihlasit
      let userLoged = this.$store.state.userLoged
      if (userLoged) {
        return "exit_to_app"
      } else if (userLoged === null) {
        return "account_box"
      }
    },
    logOut() { //logout
      let userLoged = this.$store.state.userLoged
      this.$store.commit('setLogout', null)
      if (userLoged) {
        var txt;
        if (confirm("Opravdu se chcete odhlásit?")) {
          txt = "Nyní jste odhlášeni!";
          window.location.href = "http://localhost:8080/";
          alert(txt);
        }
      } else {
        window.location.href = "http://localhost:8080/login";
      }
    },
    redirProfilDetail() {//redirect na editaci profilu
      window.location.href = "http://localhost:8080/profiledit";
    }
  },
  beforeMount() {
    this.loged = this.$store.state.loged

    if (this.loged) {
      this.icon = "exit_to_app"
    }
  },
  mounted() {

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

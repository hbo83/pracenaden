<template>
<v-container style="padding: 0">
  <v-row style="background-color:#90e4f1" no-gutters>
    <v-col cols="4" sm="4" class="px-6">
        <h1 @click="homePage">{{ msg }}</h1>
    </v-col>
    <v-col cols="4" sm="4">
        <!-- <v-text-field label="Hledat" append-icon="search" single-line solo hide-details></v-text-field> -->
    </v-col>
    <v-col cols="4" sm="4" class="pt-3">

        <v-icon v-show="loged || updateLoged" @click="redirProfilDetail" style="color: white; float: right; margin-right: 68px;cursor: pointer; margin-top: 0px" size="28px">edit</v-icon>
        <p style="text-align: right; color: white;"><b>{{ userLoged || updateUserLoged}}</b><span>
            <v-icon @click="logOut" to="/login" style="color: white; float: right; margin-right: 20px;cursor: pointer; margin-left: 10px; margin-top: 0px" size="28px">{{icon}}</v-icon>
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
    this.userLoged = this.$store.state.userLoged
    // console.log(this.loged)
    if (this.loged) {
      this.icon = "exit_to_app"
    }

  },
  mounted() {

    let x = localStorage.getItem("userLoged"); //toto by se melo prat ze store
    if (x) {
      // console.log(x)
      this.$store.commit('setLoged', true)
      // console.log(this.$store.state.loged)
      return "exit_to_app"
    } else if (x === null) {
      // console.log(x)
      this.$store.commit('setLoged', false)
      // console.log(this.$store.state.loged)
      return "account_box"
    }
  }
}
</script>

<style scoped>
.header,
/* .headerSearch, */
.headerIcons {
  width: 100%;
  height: 56px;
  background-color: #90e4f1;
  /* margin-top: 20px; */
}

/* .headerSearch {
  padding-top: 4px;
} */

.headerIcons {
  padding-top: 15px;
}

h1 {
  text-align: left;
  color: white;
  cursor: pointer;
  display: block;

}

a {
  color: #42b983;
}
</style>

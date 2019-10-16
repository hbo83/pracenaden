<template>
<v-container>
  <v-row style="background-color:#90e4f1" no-gutters>
    <v-col cols="4" sm="4">
      <!-- <h1>i am from the helper</h1> -->
      <!-- <div class="header"> -->
        <h1 @click="homePage">{{ msg }}</h1>

      <!-- </div> -->
    </v-col>
    <v-col cols="4" sm="4">
      <!-- <div class="headerSearch"> -->
        <v-text-field label="Hledat" append-icon="search" single-line solo hide-details></v-text-field>
      <!-- </div> -->
    </v-col>
    <v-col cols="4" sm="4">
      <!-- <div class="headerIcons"> -->
        <v-icon v-show="loged || updateLoged" @click="redirProfilDetail" style="color: white; float: right; margin-right: 68px;cursor: pointer; margin-top: 0px" size="28px">edit</v-icon>
        <p style="text-align: right; color: white;"><b>{{ userLoged || updateUserLoged}}</b><span>
            <v-icon @click="logOut" to="/login" style="color: white; float: right; margin-right: 20px;cursor: pointer; margin-left: 10px; margin-top: 0px" size="28px">{{icon}}</v-icon>
          </span></p>
      <!-- </div> -->
    </v-col>
  </v-row>
</v-container>

<!-- </v-app> -->
</template>

<script>
export default {

  name: 'Header',
  data() {
    return {
      msg: 'Pracenaden.cz',
      userLoged: null,
      loged: false,
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

      let x = localStorage.getItem("userLoged"); //toto by se melo prat ze store
      if (x) {
        console.log(x)
        // this.$store.commit('setLoged', true)
        return "exit_to_app"
      } else if (x === null) {
        console.log(x)
        // this.$store.commit('setLoged', false)
        return "account_box"
      }
    },
    logOut() { //logout
      let x = localStorage.getItem("userLoged");
      if (x) {
        var txt;
        if (confirm("Opravdu se chcete odhlásit?")) {
          txt = "Nyní jste odhlášeni!";
          localStorage.removeItem("userLoged");
          localStorage.removeItem("userLoged_id");
          window.location.href = "http://localhost:8080/";
          this.loged === false;
          alert(txt);
        }

      } else {
        window.location.href = "http://localhost:8080/login";
        this.loged === true;

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
  width: 100px
}

a {
  color: #42b983;
}
</style>

<template>
  <div>
    <v-toolbar :style="{ backgroundColor: color }">
      <v-toolbar-title><h1 @click="homePage">Prácenaden.cz <span style="font-size: 14px">- katalog výpomoci</span></h1></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="!btnState" color="#FFB6C1" text to="/offers">Poptávka</v-btn>
        <v-btn v-if="btnState" color="#90e4f1" text to="/">Profil</v-btn>
        <v-btn disabled text>{{ updateUserLoged }}</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn v-show="!updateUserLoged" icon @click="logIn">
          <v-icon>account_box</v-icon>
        </v-btn>
        <v-btn v-show="updateUserLoged" icon @click="logOut">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn icon @click="toProfilDetail">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn icon @click="toOfferEdit">
          <v-icon>alarm</v-icon>
        </v-btn>
        <v-btn icon @click="toInfo">
          <v-icon>info</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>
<!-- <v-icon v-show="!updateUserLoged" class="loged" @click="logIn" color="white" large>account_box</v-icon>
<v-icon v-show="updateUserLoged" class="loged" @click="logOut" color="white" large>exit_to_app</v-icon> -->
<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
export default {

  name: 'Header2',
components: {
  MenuIcon
},

  data() {
    return {
      userLoged: null,
      currentSwitchState: false,//profil nebo offer
      switchState: false,//status prepinace
      fontSize: '20px',
      // color: "#90e4f1"
    }
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: { //vuex state je dobry updatovat v computed
    btnState() {//na základě barvy Headeru see zobrazi btn link
      if(this.color === "#FFB6C1") {
        return true
      } else {
        return false
      }
    },
    updateUserLoged() { //return je spravny kdyz beru z vuex
      return this.$store.state.userLoged
    }
  },
  methods: {
    

    homePage() { //pri kliknuti na logo redirect na homepage
      this.$store.commit('set_currentLink', 'home')
      window.location.href = "http://localhost:8080/";
    },
    logIn() {
      window.location.href = "http://localhost:8080/login";
    },
    toInfo() {
      window.location.href = "http://localhost:8080/info";
    },
    toOfferEdit() {
      window.location.href = "http://localhost:8080/offeredit";
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
    toProfilDetail() { //redirect na editaci profilu
      window.location.href = "http://localhost:8080/profiledit";
    }
  },
  beforeMount() {

  },
  mounted() {
    this.currentSiteProfil = this.$store.state.currentSiteProfil
    this.currentSwitchState = this.$store.state.currentSwitchState

  },
  updated() {

  }
}
</script>

<style scoped>
h1 {
  color: white;
  cursor: pointer;
}
</style>

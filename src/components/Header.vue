<template>
  <div>
    <v-toolbar :style="{ backgroundColor: color }">
      <v-toolbar-title><h1 @click="homePage">Prácenaden.cz <span style="font-size: 14px">- online katalog služeb</span></h1></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn v-if="offerBtnState" :color="pinky" text to="/offers">Poptávka</v-btn>
        <v-btn v-if="profilBtnState" :color="sky" text to="/">Profil</v-btn>
        <v-btn v-if="editProfilBtnState" icon @click="toProfilDetail">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn v-if="editOfferBtnState" icon @click="toOfferEdit">
          <v-icon>edit</v-icon>
        </v-btn>
        <v-btn disabled text>{{ updateUserLoged }}</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn v-show="!updateUserLoged" icon @click="logIn">
          <v-icon>account_box</v-icon>
        </v-btn>
        <v-btn v-show="updateUserLoged" icon @click="logOut">
          <v-icon>exit_to_app</v-icon>
        </v-btn>

        <v-btn icon @click="toInfo">
          <v-icon>info</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

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
      fontSize: '20px',
      pinky: "#FFB6C1",
      sky: "#90e4f1",
      greeny: "#40a30d"
    }
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: { //vuex state je dobry updatovat v computed
    profilBtnState() {//na základě barvy Headeru see zobrazi btn link
      if(this.color === this.pinky || this.color === this.greeny) {
        return true
      } else {
        return false
      }
    },
    offerBtnState() {//na základě barvy Headeru see zobrazi btn link
      if(this.color === this.sky|| this.color === this.greeny) {
        return true
      } else {
        return false
      }
    },
    editProfilBtnState() {
      if(this.color === this.sky) {
        return true
      } else if (this.color === this.greeny){
        return false
      }
    },
    editOfferBtnState() {
      if(this.color === this.pinky) {
        return true
      } else if (this.color === this.greeny){
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
  console.log(this.profilBtnState)
  console.log(this.color)
  },
  mounted() {
    // this.currentSiteProfil = this.$store.state.currentSiteProfil
    // this.currentSwitchState = this.$store.state.currentSwitchState

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

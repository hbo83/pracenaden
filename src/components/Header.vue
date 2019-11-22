<template>
  <!-- <v-app> -->
<v-container style="padding: 0">
  <v-row :style="{ backgroundColor: color }" no-gutters>
    <!-- <v-row style="background-color:#90e4f1" no-gutters> -->
    <v-col cols="4" class="px-6">
      <h1 @click="homePage">Prácenaden.cz <span style="font-size: 14px">- katalog výpomoci</span></h1>
    </v-col>
    <v-col style="justify-content: center;display: flex">
      <!-- <v-switch @change="onChange" v-model="currentSwitchState" :color="switchColor" background-color="" :style="{ height: fontSize }"class="ma-4" :label="`${updateSwitchText}`"></v-switch> -->
      <v-btn icon color="#FFB6C1" fab>  <v-icon class="loged mx-auto" @click="onChange" color="#90e4f1"  large dark>accessibility</v-icon></v-btn>
      <v-btn icon color="#90e4f1" fab>  <v-icon class="loged mx-auto" @click="onChange" color="#FFB6C1" large dark>accessibility_new</v-icon></v-btn>
      <!-- <v-btn color="#FFB6C1" icon>  <v-icon class="loged mx-auto" @click="toInfo" color="white" large dark v-on="on">event</v-icon></v-btn> -->
      <!-- <v-btn color="#FFB6C1" icon>  <v-icon class="loged mx-auto" @click="toInfo" color="white" large dark v-on="on">event</v-icon></v-btn> -->
    </v-col>
    <v-col cols="5" sm="5" class="pt-3">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon class="loged" @click="toInfo" color="white" large dark v-on="on">info</v-icon>
        </template>
        <span>Informace</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon class="loged" @click="toOfferEdit" color="white" large dark v-on="on">alarm</v-icon>
        </template>
        <span>Zadat poptávku</span>
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
<!-- </v-app> -->
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue';
export default {

  name: 'Header',
components: {
  MenuIcon
},
icons: {
    iconfont: 'mdiSvg',
  },
  data() {
    return {
      userLoged: null,
      currentSwitchState: false,//profil nebo offer
      switchState: false,//status prepinace
      fontSize: '20px'
    }
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: { //vuex state je dobry updatovat v computed
    switchColor() {
      if(this.currentSiteProfil) {
        return "#90e4f1"
      } else {
        return "#FFB6C1"
      }
    },
    updateUserLoged() { //return je spravny kdyz beru z vuex
      return this.$store.state.userLoged
    },
    updateSwitchText() {//meni text u switch
      if(!this.currentSiteProfil) {
        return "Lidé"
      } else {
        return "Poptávky"
      }
    }
  },
  methods: {
    onChange() {
      if(this.currentSiteProfil){
        window.location.href = "http://localhost:8080/offers";
        this.$store.commit('set_currentSiteProfil', false )
        this.$store.commit('set_currentSwitchState', false)
      } else {
        window.location.href = "http://localhost:8080";
        this.$store.commit('set_currentSiteProfil', true )
        this.$store.commit('set_currentSwitchState', true)
      }
    },

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
    redirProfilDetail() { //redirect na editaci profilu
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

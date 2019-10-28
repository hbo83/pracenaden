import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueResource from 'vue-resource'//pro pouziti Vue.http.get
import createPersistedState from 'vuex-persistedstate'//data zustanou pr refreshi, jak easy nakonec

Vue.use(Vuex);
Vue.use(VueResource);//souvisi s createPersistedState

//state nelze primo menit, ale jen skrze mutations. Asi jako v jave potrebujes settry
export const store = new Vuex.Store({
  plugins: [createPersistedState()],//data zustanou pr refreshi, jak easy nakonec
  strict: true, //nenecha menit state primo, ale musi se menit commitem
  state: { //to samy co data
    allProfiles: [],//vsechny profily v DB
    thisProfile: {},//aktualni profil( profilDEtail a profilEdit ) - ted nefunkcni
    currentProfilIndex: null,//zde se uloží index aktuálního objektu, který se má zobrazit v profilDetail
    userLoged: localStorage.getItem("userLoged"),
    userLogedId: localStorage.getItem("userLoged_id"),
    loged: false,
    userImages: [],

  },
  mutations: { //commit+track State changes, mutation meni state. Nelze volat primo, ale skrze "store.commit('funkce')", jsou podobne udalostem

    FETCH_USERS(state, users) {//commit, ktery naplni serverData, pouzito v action fetchUser()
        state.allProfiles = users
    },
    set_currentProfilIndex(state, index) {//commit, který naplní currentProfilIndex
      state.currentProfilIndex = index
    },
    setThisProfile(state, index){//commit, který naplní thisProfile
      state.thisProfile = index
    },
    setLoged(state, loged) {//zalogován?
      state.loged = loged
    },
    setUserLoged(state, userLoged) {//kdo je zalogován
      state.userLoged = userLoged
    },
    setUserImgs(state, img) {//vrati imgs aktualniho profilu
      state.userImages = img
    },

    setThisProfileWebVisible( state, boolean ) {//nastavi visibilitu webu v this profilu, pokud jen updatuju DB, tak se visibilita nezmeni ptze to bere ze state
      state.allProfiles[1].webVisible = boolean
    },

  },
  getters: { //to samy jako computed. Kdyz budu chtit vratit neco slozitejsiho nez jen this.$store.state.loged tak pouziju getter a v komponente volam jen getter v computed this.$store.getters.NejakejGetter
    // https://www.youtube.com/watch?v=OtLRQdjmFvs

    getLoged: state => state.loged,

    getWebVisible: state => state.allProfiles[state.currentProfilIndex].webVisible,

    getThisProfil: ( state ) => {//vrátí aktuální profil, voláno v profilDetail
      return state.allProfiles[state.currentProfilIndex]
    },
    // getPricePlusCurrency: state => {//tento getter se vola v computed v ProfilDetail
    //   return state.selectedProfilData.money + state.selectedProfilData.currency
    // },

    // getCategoryString: state => {//tento getter se vola v computed v ProfilDetail
    //   let category = state.selectedProfilData.category
    //   // let category2 = category.join(", ")
    //   return category
    // },

    getProfilePhotoPath: state => {

    }

  },
  actions: { //to samy jako metody, actions vola metodu z mutation ktera meni state, volame metodou.dispatch(), mutation jsou synchroni, ale actions ne

  fetchUser({ commit }) {
        return new Promise((resolve, reject) => {
            Vue.http.get('http://localhost:8081/profiles')
            .then((response) => {
                commit("FETCH_USERS", response.body);//spusti mutation, ktery naplni serverData
                resolve();
            })
            .catch((error) => {
                console.log(error.statusText);
            });
        });

    },
    reducePrice: context => { //v komponentte volame this.$store.dispatch.reducePrice
      setTimeout(function() {
        context.commit('setLoged') //rikame ze tuhle akci volame s kontextem tohodle mutation
      }, 2000)
    }
  }
})

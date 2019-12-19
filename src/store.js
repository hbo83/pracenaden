import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueResource from 'vue-resource' //pro pouziti Vue.http.get
import createPersistedState from 'vuex-persistedstate' //data zustanou pr refreshi, jak easy nakonec

Vue.use(Vuex);
Vue.use(VueResource); //souvisi s createPersistedState

//state nelze primo menit, ale jen skrze mutations. Asi jako v jave potrebujes settry
export const store = new Vuex.Store({
  plugins: [createPersistedState()], //data zustanou pr refreshi, jak easy nakonec
  strict: true, //nenecha menit state primo, ale musi se menit commitem
  state: { //to samy co data
    allProfiles: [], //vsechny profily v DB
    currentProfile: {},//objekt aktualniho profilu
    userLoged: null, //objekt usera(_id,email,password)
    jobFilter: '', //aktuálně nastavený filtr na Obor
    cityFilter: '', //aktuálně nastavený filtr na město
    categoryFilter: '',//aktuálně nastavený filtr na kategorii
    currentLink: '', //aktuální link
    loginDialogState: false,//dialog na login visible or not
    screenSize: '',//sirka displaye var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    allOffers: [], //vsechny offers v DB
    currentOffer: null, //zde se ulozi aktualni offer po kliknuti na ProfilOffer
    currentOfferIndex: null //zde se uloží index aktuální nabídky, která se zobrazí po rozkliknutí editace nabídek, slouží k indexu slozky na upload fotky
  },
  mutations: { //commit+track State changes, mutation meni state. Nelze volat primo, ale skrze "store.commit('funkce')", jsou podobne udalostem
    set_loginDialogState( state, bool ) {//ligin dialog true/false kvuli btn v jiny komponente
      state.loginDialogState = bool
    },
    set_currentLink(state, view) { //nastaví aktuální router link .../link, kvuli ikoně v header
      state.currentLink = view
    },
    setLogout(state, logout) {//po odhlaseni nastavi objekt userLoged zpet na null, kvili ikone
      state.userLoged = null
    },
    FETCH_USERS(state, users) { //commit, ktery naplni serverData, pouzito v action fetchUser()
      state.allProfiles = users
    },
    FETCH_OFFERS(state, offer) { //commit, ktery naplni serverData, pouzito v action fetchUser()
      state.allOffers = offer
    },
    setUserLoged(state, userLoged) { //naplni objekt zalogovanym userem
      state.userLoged = userLoged
    },
    set_currentProfile( state, currentProfile ) {//objekt aktualniho profilu po kliknuti na profil
      state.currentProfile = currentProfile
    },
    set_currentOffer(state, index) { //commit, který naplní currentOfferIndex
      state.currentOffer = index
    },
    set_currentOfferIndex(state, index) { //commit, který naplní currentOfferIndex
      state.currentOfferIndex = index
    },
    setJobFilter(state, job) { //commit nastavi jobFilter
      state.jobFilter = job
    },
    setCityFilter(state, city) { //commit nastavi cityFilter
      state.cityFilter = city
    },
    setCategoryFilter(state, category) { //commit nastavi cityFilter
      state.categoryFilter = category
    },
    setAllProfiles(state, profiles) {
      state.allProfiles = profiles
    },
    setAllOffers(state, offer) {
      state.allOffers = offer
    }


  },
  getters: { //to samy jako computed. Kdyz budu chtit vratit neco slozitejsiho nez jen this.$store.state.loged tak pouziju getter a v komponente volam jen getter v computed this.$store.getters.NejakejGetter
    // https://www.youtube.com/watch?v=OtLRQdjmFvs
    // get_fullName: state => {
    //   state.userFirstName + userLastName
    // },
    getLoged: state => state.loged,

    // getWebVisible: state => state.allProfiles[state.currentProfilIndex].webVisible,

    getThisProfil: (state) => { //vrátí aktuální profil, voláno v profilDetail
      return state.allProfiles[state.currentProfilIndex]
    },

    getProfilePhotoPath: state => {

    }

  },
  actions: { //to samy jako metody, actions vola metodu z mutation ktera meni state, volame metodou.dispatch(), mutation jsou synchroni, ale actions ne
    //podud chceme neco comitovat bez API tak muzem bez actions, ale jak budem ocekavat naky data tak pres actions
    fetchUser({
      commit
    }) {
      return new Promise((resolve, reject) => {
        Vue.http.get('http://localhost:8081/profiles')
          .then((response) => {
            commit("FETCH_USERS", response.body); //spusti mutation, ktery naplni serverData
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
    },


  fetchOffers({
    commit
  }) {
    return new Promise((resolve, reject) => {
      Vue.http.get('http://localhost:8081/offers')
        .then((response) => {
          commit("FETCH_OFFERS", response.body); //spusti mutation, ktery naplni serverData
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

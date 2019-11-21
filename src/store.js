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
    currentProfilIndex: null,//zde se uloží index aktuálního objektu, který se má zobrazit v profilDetail
    currentOffer: null,//zde se ulozi aktualni offer po kliknuti na ProfilOffer
    currentOfferIndex: null,//zde se uloží index aktuální nabídky, která se zobrazí po rozkliknutí editace nabídek, slouží k indexu slozky na upload fotky
    currentSiteProfil: true,//profil nebo offers? data pro switch
    currentSwitchState: false,
    userLoged: null,//overuje zda je zalogovany any user
    userLogedId: '',//id zalogovaneho usera
    userImages: [],
    jobFilter: '',//aktuálně nastavený filtr na Obor
    cityFilter: '',//aktuálně nastavený filtr na město
    currentLink: ''//aktuální link

  },
  mutations: { //commit+track State changes, mutation meni state. Nelze volat primo, ale skrze "store.commit('funkce')", jsou podobne udalostem
    set_currentSwitchState( state, onOff) {//meni switch state
      state.currentSwitchState = onOff
    },
    set_currentSiteProfil( state, profil) {//nastavi zda jsem na profilu ci offer
      state.currentSiteProfil = profil
    },
    set_currentLink( state, view) {//nastaví aktuální router link .../link, kvuli ikoně v header
      state.currentLink = view
    },
    setLogout(state, logout) {
      state.userLoged = null
    },
    FETCH_USERS(state, users) {//commit, ktery naplni serverData, pouzito v action fetchUser()
        state.allProfiles = users
    },
    set_currentProfilIndex(state, offer) {//commit, který naplní currentProfil
      state.currentProfilIndex = offer
    },
    set_currentOffer(state, index) {//commit, který naplní currentOfferIndex
      state.currentOffer = index
    },
    set_currentOfferIndex(state, index) {//commit, který naplní currentOfferIndex
      state.currentOfferIndex = index
    },
    setLoged(state, loged) {//zalogován?
      state.loged = loged
    },
    setLogedId(state, id) {
      state.userLogedId = id
    },
    setUserLoged(state, userLoged) {//kdo je zalogován
      state.userLoged = userLoged
    },
    setUserImgs(state, img) {//vrati imgs aktualniho profilu
      state.userImages = img
    },
    setJobFilter( state, job ) {//commit nastavi jobFilter
      state.jobFilter = job
    },
    setCityFilter( state, city ) {//commit nastavi cityFilter
      state.cityFilter = city
    },
    setAllProfiles( state, filter ) {
      state.allProfiles = filter
    },
    setThisProfileWebVisible( state, boolean ) {//nastavi visibilitu webu v this profilu, pokud jen updatuju DB, tak se visibilita nezmeni ptze to bere ze state
      state.allProfiles[1].webVisible = boolean
    },

    setHelpData( state, data) {
      state.helpData = data
    }

  },
  getters: { //to samy jako computed. Kdyz budu chtit vratit neco slozitejsiho nez jen this.$store.state.loged tak pouziju getter a v komponente volam jen getter v computed this.$store.getters.NejakejGetter
    // https://www.youtube.com/watch?v=OtLRQdjmFvs

    getLoged: state => state.loged,

    getWebVisible: state => state.allProfiles[state.currentProfilIndex].webVisible,

    getThisProfil: ( state ) => {//vrátí aktuální profil, voláno v profilDetail
      return state.allProfiles[state.currentProfilIndex]
    },

    getProfilePhotoPath: state => {

    }

  },
  actions: { //to samy jako metody, actions vola metodu z mutation ktera meni state, volame metodou.dispatch(), mutation jsou synchroni, ale actions ne
  //podud chceme neco comitovat bez API tak muzem bez actions, ale jak budem ocekavat naky data tak pres actions
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

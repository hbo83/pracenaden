import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);

//state nelze primo menit, ale jen skrze mutations. Asi jako v jave potrebujes settry
export const store = new Vuex.Store({
  strict: true, //nenecha menit state primo, ale musi se menit commitem
  state: { //to samy co data
    summaryData: [],
    profilPhotoPath: '',
    userLoged: localStorage.getItem("userLoged"),
    userLogedId: localStorage.getItem("userLoged_id"),
    selectedProfil: '',
    loged: false,
    selectedProfilData: {},
    userImages: {},
    webVisible: true
  },
  mutations: { //commit+track State changes, mutation meni state. Nelze volat primo, ale skrze "store.commit('funkce')"
    setSummaryData(state, data) {
      state.summaryData = data
    },
    setLoged(state, loged) {
      state.loged = loged
    },
    setUserLoged(state, userLoged) {
      state.userLoged = userLoged
    },
    setSelectedProfil(state, selectedProfil) {
      state.selectedProfil = selectedProfil
    },
    setSelectedIdProfil(state, selectedIdProfil) {
      state.selectedIdProfil = selectedIdProfil
    },
    setUserData(state, user) {
      state.selectedProfilData = user
    },
    setUserImgs(state, img) {
      state.userImages = img
    }
    // setSummaryData(state, data) {
    //   axios.get('http://localhost:8081/profiles')
    //     .then((response) => {
    //       console.log(response.data);
    //       state.summaryData = response.data
    //       console.log(state.summaryData);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  },
  getters: { //to samy jako computed. Kdyz budu chtit vratit neco slozitejsiho nez jen this.$store.state.loged tak pouziju getter a v komponente volam jen getter v computed this.$store.getters.NejakejGetter
    getFacebook: state => state.selectedProfilData.facebook,
    getLoged: state => state.loged,
    getSummaryData: state => state.summaryData

  },
  actions: { //to samy jako metody, actions vola metodu z mutation ktera meni state
    reducePrice: context => { //v komponentte volame this.$store.dispatch.reducePrice
      setTimeout(function() {
        context.commit('setLoged') //rikame ze tuhle akci volame s kontextem tohodle mutation
      }, 2000)
    }

    // getInitData: function(context) {
    //   context.commit('setSummaryData')
    //   axios.get('http://localhost:8081/profiles')
    //     .then((response) => {
    //       console.log(response.data);
    //
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }
})

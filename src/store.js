import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//state nelze primo menit, ale jen skrze mutations. Asi jako v jave potrebujes settry
export const store = new Vuex.Store({
  state: { //to samy co data
    flavor: '',
    userLoged: '',
    selectedProfil: '',
    // selectedProfilData: {
    //   name: '',
    //   job: '',
    //   money: '',
    //   phone: '',
    //   city: '',
    //   description: '',
    //   web: '',
    //   facebook: '',
    //   instagram: '',
    //   skype: '',
    //   whatsapp: '',
    //   aboutMe: '',
    //   offerMe: ''
    // }
    selectedProfilData: {},
    userImages: {}
  },
  mutations: { //commit+track State changes
    change(state, flavor) {
      state.flavor = flavor
    },
    setUserLoged(state, user) {
      state.userLoged = user
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
  },
  getters: { //to samy jako computed
    flavor: state => state.flavor
  },
  actions: { //to samy jako metody, actions vola metodu z mutation ktera meni state

  }
})
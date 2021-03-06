import Vue from 'vue'
// import Vuetify from 'vuetify/lib'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {
  store
} from './store'
  import 'vue-trix'

import 'vue-material-design-icons/styles.css';
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  mounted() {
     // axios
     //  .get('https://api.coindesk.com/v1/bpi/currentprice.json')
     //  .then(response => (this.info = response))
  },
  render: h => h(App)
}).$mount('#app')

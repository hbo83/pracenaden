import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/profil/Home.vue'
import Login from '@/views/login/Login'
import Signin from '@/views/signin/Signin'
// import ProfilDetail from '@/views/profil/ProfilDetail.vue'
import ProfilEdit from '@/views/profil/ProfilEdit.vue'
import Info from '@/views/info/Info.vue'
import Offers from '@/views/offer/Offers.vue'
import OfferDetail from '@/views/offer/OfferDetail.vue'
import OfferEdit from '@/views/offer/OfferEdit.vue'
import OfferEditForm from '@/views/offer/OfferEditForm.vue'
import OfferNewItem from '@/views/offer/OfferNewItem.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/profildetail/:index',//cesta v URL adrese
    //   name: 'ProfilDetail',
    //   component: ProfilDetail//nazev komponenty
    // },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profilEdit',
      name: 'ProfilEdit',
      component: ProfilEdit
    },
    {
      path: '/info',
      name: 'Info',
      component: Info
    },
    {
      path: '/offers',
      name: 'Offers',
      component: Offers
    },
    {
      path: '/offerDetail/:index',
      name: 'OfferDetail',
      component: OfferDetail
    },
    {
      path: '/offeredit',
      name: 'OfferEdit',
      component: OfferEdit
    },
    {
      path: '/offereditForm/:index',
      name: 'OfferEditForm',
      component: OfferEditForm
    },
    ,
    {
      path: '/offernewitem',
      name: 'OfferNewItem',
      component: OfferNewItem
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

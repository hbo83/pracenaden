import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from '@/views/Login'
import Signin from '@/views/Signin'
import ProfilDetail from '@/views/ProfilDetail.vue'
import ProfilEdit from '@/views/ProfilEdit.vue'
import Info from '@/views/Info.vue'
import Offers from '@/views/Offers.vue'
import OfferDetail from '@/views/OfferDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profildetail',
      name: 'ProfilDetail',
      component: ProfilDetail
    },
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
      path: '/offerDetail',
      name: 'OfferDetail',
      component: OfferDetail
    },
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

import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminHome from '@/components/admin/AdminHome'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'AdminLogin',
      component: AdminLogin
    },
    {
      path: '/admin/home',
      name: 'AdminHome',
      component: AdminHome
    }
  ]
})

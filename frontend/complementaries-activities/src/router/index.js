import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminHome from '@/components/admin/AdminHome'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
      meta: {
        quest: true
      }
    },
    {
      path: '/admin/home',
      name: 'AdminHome',
      component: AdminHome,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user.token == null) {
      next({
        path: '/admin/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.admin) {
          next()
        } else {
          next({ name: 'AdminHome' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if(user.token == null){
      next()
    } else{
      next({ name: 'userboard'})
    }
  } else {
    next()
  }
})
export default router

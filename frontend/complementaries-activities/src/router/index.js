import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminHome from '@/components/admin/AdminHome'
import AdminManagerProfessor from '@/components/admin/AdminManagerProfessor'
import AdminGroup from '@/components/admin/AdminGroup'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
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
    },
    {
      path: '/admin/professor/:id',
      component: AdminManagerProfessor,
    },
    {
      path: '/admin/professor',
      component: AdminManagerProfessor,
    },
    {
      path: '/admin/grupo',
      component: AdminGroup
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user')) 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user == null || user.token == null) {
      next({
        path: '/admin',
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

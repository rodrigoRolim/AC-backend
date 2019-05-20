import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '@/components/admin/AdminLogin'
import AdminHome from '@/components/admin/AdminHome'
import AdminProfessor from '@/components/admin/AdminProfessor'
import AdminGroup from '@/components/admin/AdminGroup'
import ProfessorLogin from '@/components/professor/ProfessorLogin'
import ProfessorHome from '@/components/professor/ProfessorHome'
import Home from '@/components/Home'
import StudentLogin from '@/components/student/StudentLogin'
import AddStudent from '@/components/student/AddStudent'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
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
      component: AdminProfessor,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admin/professor',
      component: AdminProfessor,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/admin/grupo',
      component: AdminGroup,
      meta: {
        requiresAuth: true,
        is_admin: true
      }
    },
    {
      path: '/professor',
      component: ProfessorLogin,
      meta: {
        quest: true
      }
    },
    {
      path: '/professor/home',
      component: ProfessorHome,
      meta: {
        quest: true
      }
    },
    {
      path: '/aluno',
      component: StudentLogin,
      meta: {
        quest: true
      }
    },
    {
      path: '/aluno/registrar',
      component: AddStudent
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem('token'))
  console.log(user) 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user == null || user.token == null) {
      next({
        path: '/admin',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        console.log(user.admin)
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

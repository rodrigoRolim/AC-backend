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
import StudentHome from '@/components/student/StudentHome'
import AdminDepartment from '@/components/admin/AdminDepartment'
import Denied from '@/components/Denied'

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
        requiresAuth: true,
        is_professor: true,
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
      component: AddStudent,
      meta: {
        quest: true
      }
    },
    {
      path: '/aluno/home',
      component: StudentHome,
      meta: {
        requiresAuth: true,
        is_student: true
      }
    },
    {
      path: '/admin/departamentos',
      component: AdminDepartment
    },
    {
      path: '/denied-access',
      name: 'DeniedAccess',
      component: Denied
    },
  ]
})

router.beforeEach((to, from, next) => {
  let access = JSON.parse(localStorage.getItem('token'))
  console.log(access) 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (access == null || access.token == null) {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.is_admin)) {
        console.log(access.admin)
        if (access.tag == 0) {
          next()
        } else {
          next({ name: 'DeniedAccess' })
        }
      } else {
        next()
      }
      if (to.matched.some(record => record.meta.is_professor)) {
        if (access.tag == 1) {
          next()
        } else {
          next({ name: 'DeniedAccess' })
        }
      } else {
        next()
      }
      if (to.matched.some(record => record.meta.is_student)) {
        if (access.tag == 2) {
          next()
        } else {
          next({ name: 'DeniedAccess' })
        }
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if(access.token == null){
      next()
    } else{
      next({ name: 'DeniedAccess' })
    }
  } else {
    next()
  }
})
export default router

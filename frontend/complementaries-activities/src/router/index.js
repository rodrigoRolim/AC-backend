import Vue from 'vue'
import Router from 'vue-router'
import AdminGraduation from '@/components/professor/AdminGraduation'
import AdminProfessor from '@/components/professor/AdminProfessor'
import AdminGroup from '@/components/professor/AdminGroup'
import AdminDepartment from '@/components/professor/AdminDepartment'
import ProfessorLogin from '@/components/professor/ProfessorLogin'
import ProfessorHome from '@/components/professor/ProfessorHome'
import Home from '@/components/Home'
import StudentLogin from '@/components/student/StudentLogin'
import AddStudent from '@/components/student/AddStudent'
import StudentHome from '@/components/student/StudentHome'
import AddDocument from '@/components/student/AddDocument'
import Denied from '@/components/Denied'
import AddFirstProfessor from '../../only-development/AddFirstProfessor'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    {
      path: '/professor/home', // mudar para professor/curso
      name: 'AdminHome',
      component: AdminGraduation,
      meta: {
        requiresAuth: true,
        is_professor: true
      }
    },
    {
      path: '/admin/professores/:id',
      component: AdminProfessor,
      meta: {
        requiresAuth: true,
        is_professor: true
      }
    },
    {
      path: '/admin/professores',
      component: AdminProfessor,
      meta: {
        requiresAuth: true,
        is_professor: true
      }
    },
    {
      path: '/admin/grupos',
      component: AdminGroup,
      meta: {
        requiresAuth: true,
        is_professor: true
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
      name: 'StudentHome',
      meta: {
        requiresAuth: true,
        is_student: true
      }
    },
    {
      path: '/aluno/documento/add',
      component: AddDocument,
      meta: {
        requiresAuth: true,
        is_student: true
      }
    },
    {
      path: '/admin/departamentos',
      component: AdminDepartment,
      is_professor: true
    },
    {
      path: '/denied-access',
      name: 'DeniedAccess',
      component: Denied
    },
    {
      path: '/primeiro',
      name: 'FirstProfessor',
      component: AddFirstProfessor
    }
  ]
})

/* router.beforeEach((to, from, next) => {
  
  let token = 'undefined'
  let user = 'undefined'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (typeof localStorage.getItem('token') != "undefined" 
       && typeof localStorage.getItem('user') != 'undefined') {
      token = JSON.parse(localStorage.getItem('token'))
      user = JSON.parse(localStorage.getItem('user'))
    }
    if (typeof token == "undefined" || typeof user == 'undefined') {
      next({
        path: '/',
        params: { nextUrl: to.fullPath }
      })
    } else {
      if (to.matched.some(record => record.meta.is_professor)) {
        console.log(user.user_type)
        if (user.type_user == 'professor') {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
      if (to.matched.some(record => record.meta.is_student)) {

        if (user.user_type == 'aluno') {
          console.log('aqui')
          next()
        } else {
          console.log('nao')
          next({ name: 'Home' })
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
}) */
export default router

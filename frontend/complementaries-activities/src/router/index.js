import Vue from 'vue'
import Router from 'vue-router'
import AdminGraduation from '@/components/professor/AdminGraduation'
import AdminProfessor from '@/components/professor/AdminProfessor'
import AdminGroup from '@/components/professor/AdminGroup'
import AdminDepartment from '@/components/professor/AdminDepartment'
import ProfessorLogin from '@/components/professor/ProfessorLogin'
import ProfessorHome from '@/components/professor/ProfessorHome'
import ProfessorDocuments from '@/components/professor/ProfessorDocuments'
import Home from '@/components/Home'
import StudentLogin from '@/components/student/StudentLogin'
import AddStudent from '@/components/student/AddStudent'
import StudentHome from '@/components/student/StudentHome'
import AddDocument from '@/components/student/AddDocument'
import Denied from '@/components/Denied'
import AddFirstProfessor from '../../only-development/AddFirstProfessor'
import EditStudent from '@/components/student/EditStudent'

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
      path: '/admin/cursos', // mudar para professor/curso
      name: 'ProfessorGraduation',
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
      path: '/professor/home',
      component: ProfessorHome,
      name: 'ProfessorHome',
      meta: {
        requiresAuth: true,
        is_professor: true
      }
    },
    {
      path: '/professor/aluno/documentos/:id',
      name: 'ProfessorDocuments',
      component: ProfessorDocuments
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
      path: '/aluno/perfil',
      component: EditStudent,
      name: 'EditStudent',
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
      path: '/aluno/documento/add/:id',
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

router.beforeEach((to, from, next) => {
  
  let token = 'undefined'
  let user = 'undefined'

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (typeof localStorage.getItem('token') != "undefined" &&
        localStorage.getItem('token') !== null && 
        typeof localStorage.getItem('user') != 'undefined' &&
        localStorage.getItem('user') !== null) {

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
        if (typeof user !== null || user.type_user == 'professor') {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
      if (to.matched.some(record => record.meta.is_student)) {
        
        if (typeof user !== null && user.type_user == 'aluno') {
          next()
        } else {
          next({ name: 'Home' })
        }
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if(token == null){
      next()
    } else{
      next({ name: 'DeniedAccess' })
    }
  } else {
    next()
  }
}) 
export default router

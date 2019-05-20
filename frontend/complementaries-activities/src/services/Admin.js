import { http } from './config'

export default {
  loginAdmin: ({ username, password }) => {
    console.log({username, password})
    return http.post('/admin/login', { username, password })
  },
  addDegree: ({ name }) => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/degrees/admin', { name })
  },
  readAllDegrees: () => {
    //let user = JSON.parse(localStorage.getItem('user'))
    //http.defaults.headers.common['Authorization'] = user.token || null
    return http.get('/degrees/admin')
  },
  deleteDegree: (degree) => {
    const id = degree._id
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/degrees/admin/${id}`)
  },
  updatingDegree: (id, degree) => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/degrees/admin/${id}`, degree)
  },
  addAdmin: ({ username, password }) => {

    return http.post('/users/admin/secreto', { username, password })
  },
  addProfessor: ({ admin, name, email, password }) => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/professor/admin', { name, email, password, admin })
  },
  readAllProfessors: () => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.get('/professor/admin')
  },
  updatingProfessorResponsible: (id, professor) => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/professor/admin/${id}`, professor)
  },
  unsetGraduationOfProfessor: (idGraduation) => {
    return http.put(`/professor/admin/unset/graduation/${idGraduation}`)
  }
}

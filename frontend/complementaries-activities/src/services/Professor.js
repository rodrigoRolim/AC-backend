import { http } from './config'

export default {
  login: (professor) => {
    return http.post('/professor/login', professor)
  },
  save: ({ admin, name, email, password }) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/professor/admin', { name, email, password, admin })
  },
  readAll: () => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.get('/professor/admin')
  },
  updateResponsible: (id, professor) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/professor/admin/${id}`, professor)
  },
  unsetGraduationOfProfessor: (idGraduation) => {
    return http.put(`/professor/admin/unset/graduation/${idGraduation}`)
  } // excluído do modelo professor, excluir daqui tbm

}
import { http } from './config'

export default {
  login: (professor) => {
    return http.post('/professor/login', professor)
  },
  save: (professor) => {

    return http.post('/professor/add', professor)
  },
  readAll: () => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get('/professor/all')
  },
  update: (id, professor) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/professor/update/${id}`, professor)
  }
}
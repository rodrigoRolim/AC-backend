import { http } from './config'

export default {
  save: (graduation) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.post('/graduation/add', graduation)
  },
  readAll: () => {
    return http.get('/graduation/all')
  },
  delete: (degree) => {
    const id = degree._id
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/graduation/delete/${id}`)
  },
  update: (id, degree) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/graduation/update/${id}`, degree)
  },
}
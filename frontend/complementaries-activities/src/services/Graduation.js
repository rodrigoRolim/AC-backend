import { http } from './config'

export default {
  save: (graduation) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.post('/graduation/add', graduation)
  },
  readAll: () => {
    let token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get('/graduation/all')
  },
  delete: (graduation) => {
    const id = graduation._id
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/graduation/delete/${id}`)
  },
  update: (id, graduation) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/graduation/update/${id}`, graduation)
  },
  // fazer uma função para buscar curso por id
}
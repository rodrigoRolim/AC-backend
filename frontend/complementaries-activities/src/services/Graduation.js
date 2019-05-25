import { http } from './config'

export default {
  save: ({ name }) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/degrees/admin', { name })
  },
  readAll: () => {
    return http.get('/degrees/admin')
  },
  delete: (degree) => {
    const id = degree._id
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/degrees/admin/${id}`)
  },
  update: (id, degree) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/degrees/admin/${id}`, degree)
  },
}
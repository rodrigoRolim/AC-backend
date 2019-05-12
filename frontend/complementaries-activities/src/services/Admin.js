import { http } from './config'

export default {
  loginAdmin: ({ username, password }) => {
    console.log({username, password})
    return http.post('/users/admin/login', { username, password })
  },
  addDegree: ({ name }) => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/degrees/admin/home', { name })
  },
  readAllDegrees: () => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.get('/degrees/admin/home')
  },
  deleteDegree: (degree) => {
    const id = degree._id
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/degrees/admin/home/${id}`)
  },
  updatingDegree: (id, degree) => {
    let user = JSON.parse(localStorage.getItem('user'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/degrees/admin/home/${id}`, degree)
  },
  addAdmin: ({ username, password }) => {
    console.log({username, password})
    return http.post('/users/admin/secreto', { username, password })
  }
}

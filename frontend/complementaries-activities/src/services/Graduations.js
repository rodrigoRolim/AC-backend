import { http } from './config'

export default {
  addDegree: ({ name }) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/degrees/admin', { name })
  },
  readAllDegrees: () => {
    return http.get('/degrees/admin')
  },
  deleteDegree: (degree) => {
    const id = degree._id
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/degrees/admin/${id}`)
  },
  updatingDegree: (id, degree) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/degrees/admin/${id}`, degree)
  },
}
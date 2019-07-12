import { http } from './config'

export default {
  loginAdmin: ({ username, password }) => {
    return http.post('/admin/login', { username, password })
  },
  addAdmin: ({ username, password }) => {

    return http.post('/users/admin/secreto', { username, password })
  }
}

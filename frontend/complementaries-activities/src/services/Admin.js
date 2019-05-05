import { http } from './config'

export default {
  loginAdmin: ({ username, password }) => {
    return http.post('/users/admin/login', { username, password })
  }
}

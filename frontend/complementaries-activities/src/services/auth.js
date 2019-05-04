import { http } from './config'

export default {
  loginAdmin: ({ name, password }) => {
    return http.post('admin/login', { name, password })
  }
}
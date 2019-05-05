import { http } from './config'

export default {
  loginAdmin: ({ username, password }) => {
    console.log("asdasd")
    return http.post('/users/admin/login', { username, password })
   
  }
}

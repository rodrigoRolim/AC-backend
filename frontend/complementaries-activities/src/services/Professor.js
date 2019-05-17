import { http } from './config'
export default {
  login: (professor) => {
    return http.post('/professor/login', professor)
  }
}
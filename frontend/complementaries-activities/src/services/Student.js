import { http } from './config'

export default {
  create: (student) => {
    return http.post('/student/add', student)
  },
  login: (userStudent) => {
    return http.post('/student/login', userStudent)
  }
}

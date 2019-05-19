import { http } from './config'



export default {
  create: (student) => {
    return http.post('/student/add', student)
  }
}

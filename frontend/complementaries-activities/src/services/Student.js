import { http } from './config'

export default {
  create: (student) => {
    return http.post('/student/add', student)
  },
  login: (userStudent) => {
    return http.post('/student/login', userStudent)
  },
  readAll: (idDepartment) => {
    return http.get(`/student/all/department/${idDepartment}`)
  },
  setSituation: (idStudent, newSituation) => {
    return http.get(`/student/update/situation/${idStudent}`, newSituation)
  }
}

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
    console.log(idStudent)
    console.log(newSituation)
    return http.put(`/student/update/situation/${idStudent}`, { situation: newSituation })
  }
}

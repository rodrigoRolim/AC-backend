import { http } from './config'

export default {
  readAll: () => {
    return http.get('/department/all')
  },
  save: (department) => {
    return http.post('/department/add', department)
  },
  delete: (id) => {
    return http.delete(`department/delete/${id}`)
  } 
}
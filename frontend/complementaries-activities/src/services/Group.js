import { http } from './config'

export default {
  readAll: () => {
    return http.get('/group/admin')
  },
  addGroup: (group) => {
    return http.post('/group/admin', group)
  },
  addItemInGroup: (idGroup, item) => {
    return http.put(`/group/admin/${idGroup}`, item)
  }
}
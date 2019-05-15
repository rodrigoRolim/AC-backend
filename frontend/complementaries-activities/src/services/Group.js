import { http } from './config'

export default {
  readAll: () => {
    return http.get('/group/admin')
  },
  addGroup: (group) => {
    return http.post('/group/admin', group)
  },
  addItemInGroup: (idGroup, item) => {
    return http.put(`/group/admin/add/item/${idGroup}`, item)
  },
  deleteGroup: (idGroup) => {
    return http.delete(`/group/admin/${idGroup}`)
  },
  updatingItem: (idGroup, item) => {
    return http.put(`/group/admin/update/item/${idGroup}`, item)
  }
}
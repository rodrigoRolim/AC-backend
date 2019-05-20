import { http } from './config'

export default {
  readAll: () => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.get('/group/admin')
  },
  addGroup: (group) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/group/admin', group)
  },
  addItemInGroup: (idGroup, item) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/admin/add/item/${idGroup}`, item)
  },
  deleteGroup: (idGroup) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/group/admin/${idGroup}`)
  },
  updatingItem: (idGroup, item) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/admin/update/item/${idGroup}`, item)
  },
  updatingGroup: (idGroup, group) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/admin/${idGroup}`, group)
  },
  removeItem: (idGroup, item) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/admin/remove/item/${idGroup}`, item)
  }
}
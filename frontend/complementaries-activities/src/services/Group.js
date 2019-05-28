import { http } from './config'

export default {
  readAll: () => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.get('/group/all')
  },
  addGroup: (group) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.post('/group/add', group)
  },
  addItemInGroup: (idGroup, item) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/add/item/${idGroup}`, item)
  },
  deleteGroup: (idGroup) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.delete(`/group/delete/${idGroup}`)
  },
  updatingItem: (idGroup, item) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/update/item/${idGroup}`, item)
  },
  updatingGroup: (idGroup, group) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/update/${idGroup}`, group)
  },
  removeItem: (idGroup, item) => {
    let user = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${user.token}`
    return http.put(`/group/delete/item/${idGroup}`, item)
  }
}
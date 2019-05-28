import { http } from './config'

export default {
  readAll: () => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get('/group/all')
  },
  addGroup: (group) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.post('/group/add', group)
  },
  addItemInGroup: (idGroup, item) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/group/add/item/${idGroup}`, item)
  },
  deleteGroup: (idGroup) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.delete(`/group/delete/${idGroup}`)
  },
  updatingItem: (idGroup, item) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/group/update/item/${idGroup}`, item)
  },
  updatingGroup: (idGroup, group) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/group/update/${idGroup}`, group)
  },
  removeItem: (idGroup, item) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/group/delete/item/${idGroup}`, item)
  }
}
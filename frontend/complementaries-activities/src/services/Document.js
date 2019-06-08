import { http } from './config'

export default {
  save: (document) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.post('/document/add', document)
  },
  getFile: (path) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/document/${path}`, { responseType: 'arraybuffer'})
  },
  readAll: (idStudent) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/document/all/${idStudent}`)
  },
  readAllSents: (idStudent) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/document/all/sents/${idStudent}`)
  },
  delete: (path) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.delete(`/document/${path}`)
  },
  getById: (id) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/document/${id}`)
  },
  update: (id, document) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/document/update/${id}`, document)
  },
  send: (studentId) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/document/sent/${studentId}`)
  }
}

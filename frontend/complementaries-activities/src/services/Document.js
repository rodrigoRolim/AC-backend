import { http } from './config'

export default {
  save: (document) => {
 
    return http.post('/document/add', document)
  },
  getFile: (path) => {

    return http.get(`/document/${path}`, { responseType: 'arraybuffer'})
  },
  readAll: () => {

    return http.get('/document/all')
  },
  delete: (path) => {

    return http.delete(`/document/${path}`)
  },
  getById: (id) => {
    
    return http.get(`/document/${id}`)
  },
  update: (id, document) => {
    console.log(document)
    return http.put(`/document/update/${id}`, document)
  }
}

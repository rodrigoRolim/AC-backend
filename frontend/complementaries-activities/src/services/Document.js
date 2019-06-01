import { http } from './config'

export default {
  save: (formData) => {
 
    return http.post('/document/add', formData)
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
  }
}

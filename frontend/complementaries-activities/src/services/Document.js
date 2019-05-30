import { http } from './config'

export default {
  save: (formData) => {
    console.log(formData)
    return http.post('/document/add', formData)
  },
  getFile: (path) => {
    console.log(path)
    return http.get(`/document/${path}`, { responseType: 'arraybuffer'})
  },
  readAll: () => {
    return http.get('/document/all')
  }
}

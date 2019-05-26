import { http } from './config'

export default {
  save: (formData) => {
    console.log(formData)
    return http.post('/document/add', formData)
  }
}

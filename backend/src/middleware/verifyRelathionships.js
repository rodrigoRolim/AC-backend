import Graduation from '../models/graduation'
import Document from '../models/document'

export default {
  relationsGraduations: (req, res, next) => {
    
    console.log(req.params.id)
    Graduation.find({ department: req.params.id })
      .then((graduations) => {
        console.log(graduations)
        if (graduations.length > 0) {
          res.status(403).send('o departamento tem relações com cursos')
          next('false')
        } else {
          next()
        }
      })
      .catch((err) => {
        res.send(err.message)
        next('false')
      })
     
  },
  relationsGroupsDocuments: (req, res, next) => {
    try {
      const resp = Document.find({ id_group: req.params.id });
      if (resp.length > 0) {
        res.status(403).send('O grupo tem relações ativas com documentos')
        next('false')
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  } 
}
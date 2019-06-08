import Student from '../models/student'

export default {
  approved: (req, res, next) => {
    Student.findOne({ _id: req.params.id })
      .then((student) => {
        if (student.situation == 'approved') {
          res.status(403).send('aluno já está aprovado, não pode mais enviar documentos')
          next('false')
        } else {
          next()
        }
      })
      .catch((err) => {
        res.status(400).send(err.message)
        next('false')
      })
  }
}
 
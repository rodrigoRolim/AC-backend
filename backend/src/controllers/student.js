class StudentController {
  constructor (Student, jwt, compare, castingId) {
    this.Student = Student
    this.jwt = jwt
    this.compare = compare
    this.castingId = castingId
  }
  create (req, res) {
    const student = new this.Student(req.body)

    return student.save()
      .then(() => res.status(201).send(student))
      .catch((err) => res.status(400).send(err.message))
  }
  login (req, res) {
    
    return this.Student.findOne({ ra: req.body.ra })
      .then((student) => {

        this.compare(req.body.password, student.password)
          .then((resp) => {

            if (resp) {

              const _id = student._id
              const token = this.jwt.sign({ _id }, process.env.SECRET, { expiresIn: 86400 })
 
              res.status(201).send({ token: token, auth: resp, user: student })
            } else {
              res.status(404).send('No authorization')
            }
          })
      })
      .catch((err) => res.status(400).send(err.message))
  }
  getStudentsOfDepartment (req, res) {

    return this.Student.aggregate(
      [
          {
              "$match": {
                  "department": this.castingId.ObjectId(req.params.id)
                  }
              },
              { 
                  "$lookup": {
                      "localField": '_id', 
                      "from": 'documents', 
                      "foreignField": 'student', 
                      "as": "documents"
                  }
              }, 
              {
                  "$match": { 
                      "documents.sent": true 
                  }
              }, 
              {
                  "$project": {
                      "documents": 0,
                      "password": 0
                  }
              }
          ]
      )
      .then((students) => res.send(students))
      .catch((err) => res.status(400).send(err.message))

  }
  setSituation (req, res) {

    return this.Student.findOneAndUpdate({ _id: req.params.id }, { $set: { situation: req.body.situation } } )
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(422).send(err.message))
  }
  getSituation (req, res) {

    return this.Student.findOne({ _id: req.params.id })
      .then((student) => res.send(student.situation))
      .catch((err) => res.status(400).send(err.message))
  }
  launchAll (req, res) {

    return this.Student.update({ ra: { $in: req.body.ras } }, { $set: { situation: 'launched' } }, { multi: true })
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(422).send(err.message))
  }
  update (req, res) {
    return this.Student.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(422).send(err.message))
  }
  // criar um get all students de determinado departamento, mas somente os que já enviaram seus documentos
  // criar um atualizador do atributo already_student e dispará-lo ao professor pelo pusher: findOneAndUpdate
}

export default StudentController

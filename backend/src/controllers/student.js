class StudentController {
  constructor (Student, jwt, compare) {
    this.Student = Student
    this.jwt = jwt
    this.compare = compare
  }
  create (req, res) {
    const student = new this.Student(req.body)

    return student.save()
      .then(() => res.status(201).send(student))
      .catch((err) => {
        console.log(err.message)
        res.status(400).send(err.message)})
  }
  login (req, res) {
    
    return this.Student.findOne({ name: req.body.name })
      .then((student) => {

        this.compare(req.body.password, student.password)
          .then((resp) => {

            if (resp) {

              const _id = student._id
              const token = this.jwt.sign({ _id }, process.env.SECRET, { expiresIn: 86400 })

              res.status(201).send({ token: token, auth: resp })
            } else {
              res.status(404).send('No authorization')
            }
          })
      })
      .catch((err) => res.status(400).send(err.message))
  }
}

export default StudentController

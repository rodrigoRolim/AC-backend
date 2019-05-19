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
      .catch((err) => res.status(400).send(err.message))
  }
}

export default StudentController

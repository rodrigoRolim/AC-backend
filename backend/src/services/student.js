class StudentService {

  constructor (Student) {
    this.Student = Student
  }
  turnSender (req) {
    try {
      const student = this.Student.findOneAndUpdate({ _id: req.params.id }, { already_sent: true }, { returnNewDocument: true })
      if (student.length > 0) {
        return true
      } else {
        return false
      }
    } catch (err) {
      return false
    }
  }
}

export default StudentService
class StudentService {

  constructor (Student, pusher) {
    this.Student = Student
    this.pusher = pusher
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
  subscribeStudentToProfessor (req, res) {
    try {
      const student = this.Student.find({ _id: req.params.id })
      if (student.length > 0) {
        pusher.trigger('my-channel', 'my-event', {
          "message": "hello world"
        });
      }
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
}

export default StudentService
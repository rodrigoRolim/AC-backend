class CourseController {
  constructor (Course) {
    this.Course = Course
  }
  save (req, res) {
    return res.send({
      name: 'engenharia de software'
    })
  } 
}

export default CourseController
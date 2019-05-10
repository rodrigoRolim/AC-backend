class CourseController {
  constructor (Course) {
    this.Course = Course
  }
  save (req, res) {
    console.log(req)
    const course = req
    return this.Course.create(course)
      .then(course => res.send(course))
      .catch(err => res.status(400).send(err.message))
  }
 
}

export default CourseController
class CourseController {
  constructor (Degree) {
    this.Degree = Degree
  }
  createDegree (req, res) {
    const course = req
    return this.Degree.create(course)
      .then((course) => res.send(course))
      .catch(err => res.status(400).send(err.message))
  }
  readAll (req, res) {
    return this.Degree.find({})
      .then(degrees => res.send(degrees))
  }
}

export default CourseController
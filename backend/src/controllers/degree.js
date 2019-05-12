class CourseController {
  constructor (Degree) {
    this.Degree = Degree
  }
  createDegree (req, res) {
    const course = req.body
    console.log(course)
    return this.Degree.create(course)
      .then((course) => res.send(course))
      .catch(err => res.status(400).send(err.message))
  }
  readAll (req, res) {
    return this.Degree.find({})
      .then((degrees) => res.send(degrees))
      .catch(err => res.send(err.message))
  }
  delete (req, res) {
    return this.Degree.deleteOne({ _id: req.body._id})
      .then(() => res.send('removed with success'))
      .catch((err) => res.send(err.message))
  }
}

export default CourseController
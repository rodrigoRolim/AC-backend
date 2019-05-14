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
    const { params: { id }} = req
    return this.Degree.deleteOne({ _id: id})
      .then(() => res.send({ message:'removed with success' }))
      .catch((err) => res.send(err.message))
  }
  updateDegree (req, res) {
    const { params: { id }} = req
    return this.Degree.update({ _id: id }, req.body)
      .then((degree) => res.send(degree))
      .catch((err) => res.status(422).send(err.message))
  }
}

export default CourseController
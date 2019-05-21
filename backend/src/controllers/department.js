class DepartmentController {
  constructor (Department) {
    this.Department = Department
  }
  create (req, res) {
    const department = new this.Department(req.body)

    return department.save() 
      .then(() => res.status(201).send(department))
      .catch((err) => res.status(400).send(err.message))
  }
  readAll (req, res) {
    return this.Department.find({})
      .then((departments) => res.send(departments))
      .catch(err => res.send(err.message))
  }
  delete (req, res) {
    const { params: { id }} = req
    return this.Department.deleteOne({ _id: id})
      .then(() => res.send({ message:'removed with success' }))
      .catch((err) => res.send(err.message))
  }
  update (req, res) {
    const { params: { id }} = req
    return this.Department.update({ _id: id }, req.body)
      .then((resp) => res.status(201).send(resp))
      .catch((err) => res.status(422).send(err.message))
  }
}

export default DepartmentController

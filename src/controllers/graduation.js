class CourseController {
  constructor (Graduation) {
    this.Graduation = Graduation
  }
  create (req, res) {
    const graduation = new this.Graduation(req.body)
    return graduation.save()
      .then(() => res.status(201).send(graduation))
      .catch(err => res.status(400).send(err.message))
  }
  readAll (req, res) {
    return this.Graduation.aggregate([
      { 
        "$lookup": {
        "localField": "department",
        "from": "departments", 
        "foreignField": "_id",
        "as": "departments"
      }
    },
      {
        "$addFields": {
          "departmentID": "$departments._id",
          "departmentName": "$departments.name"
        }
      },
      {
        "$project":
        {
          "departments": 0
        }

      }
    ])
      .then((graduations) => res.send(graduations))
      .catch(err => res.send(err.message))
  }
  delete (req, res) {
    const { params: { id }} = req
    return this.Graduation.deleteOne({ _id: id})
      .then(() => res.send({ message:'removed with success' }))
      .catch((err) => res.send(err.message))
  }
  update (req, res) {
    const { params: { id }} = req
    return this.Graduation.update({ _id: id }, req.body)
      .then((resp) => res.status(201).send(resp))
      .catch((err) => res.status(422).send(err.message))
  }
}

export default CourseController

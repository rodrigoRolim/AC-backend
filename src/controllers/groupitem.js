class GroupItemsController {
  constructor (Group) {
    this.Group = Group
  }
  create (req, res) {
    return this.Group.create(req.body)
      .then((newGroup) => res.status(201).send(newGroup))
      .catch((err) => res.status(400).send(err.message))
  }
  readAll (req, res) {
    return this.Group.find({})
      .then((groups) => res.send(groups))
      .catch((err) => res.send(err.message))
  }
  pushItem (req, res) {
    const { params: { id }} = req
    const item = req.body
    return this.Group.findByIdAndUpdate(id, { $push: { items: item }})
      .then((updatedGroup) => res.status(201).send(updatedGroup))
      .catch((err) => res.status(400).send(err.message))
  }
  delete (req, res) {
    return this.Group.remove({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(400).send(err.message))
  }
  updateItem (req, res) {
    return this.Group.findOneAndUpdate({ _id: req.params.id, "items._id": req.body._id },
      { "items.$.description": req.body.description })
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(422).send(err.message))
  }
  update (req, res) {

    return this.Group.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(400).send(err.message))
  }
  pullItem (req, res) {
    return this.Group.update({ _id: req.params.id }, { $pull: { items: { _id: req.body._id} } })
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(400).send(err.message))
  }
  getByName (req, res) {
    return this.Group.find({ name: req.params.name })
      .then((group) => res.send(group))
      .catch((err) => res.status(400).send(err.message))
  }
}

export default GroupItemsController

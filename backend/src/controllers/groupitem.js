class GroupItemsController {
  constructor (Group) {
    this.Group = Group
  }
  createGroup (req, res) {
    return this.Group.create(req.body)
      .then((newGroup) => res.status(201).send(newGroup))
      .catch((err) => res.status(400).send(err.message))
  }
  addItem (req, res) {
    const { params: { id }} = req
    const item = req.body
    console.log('aqui')
    console.log(item)
    console.log(id)
    return this.Group.findByIdAndUpdate(id, { $push: { items: item }})
      .then((updatedGroup) => res.status(201).send(updatedGroup))
      .catch((err) => res.status(400).send(err.message))
  }
}

export default GroupItemsController

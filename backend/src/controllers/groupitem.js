class GroupItemsController {
  constructor (Group) {
    this.Group = Group
  }
  createGroup (req, res) {
    return this.Group.create(req.body)
      .then((newGroup) => res.status(201).send(newGroup))
  }
}

export default GroupItemsController

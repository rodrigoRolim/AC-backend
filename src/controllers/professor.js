class ProfessorController {
  constructor (Professor, auth) {
    this.Professor = Professor
    this.auth = auth
  }
  login (req, res) {
    return this.Professor.findOne({ siape: req.body.siape })
      .then((professor) => {
        this.auth.authorization(req.body.password, professor)
          .then((token) =>  res.status(201).send({ token: token, auth: true, user: professor }))
      })
      .catch(() => res.status(404).send('No authorization'))
  }
  create (req, res) {
    const professor = new this.Professor(req.body)

    return professor.save()
      .then(() => {
        res.status(201).send(professor)
      })
      .catch(err => {
        res.status(422).send(err.message)
      })
  }
  readAll (req, res) {
    return this.Professor.find({})
      .then((professors) => {
        res.send(professors)})
      .catch(err => res.status(422).send(err.message))
  }
  update (req, res) {
    const { params: { id }} = req
 
    return this.Professor.findOneAndUpdate({ _id: id}, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }
  getById (req, res) {
    return this.Professor.find({ _id: req.params.id })
      .then((student) => res.send(student))
      .catch((err) => res.status(422).send(err.message))
  }
  remove (req, res) {
    return this.Professor.remove({ _id: req.params.id })
      .then((n) => res.sendStatus(204))
      .catch((err) => res.status(422).send(err.message))
  }
}

export default ProfessorController

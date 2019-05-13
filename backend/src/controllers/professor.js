class ProfessorController {
  constructor (Professor) {
    this.Professor = Professor
  }
  createProfessor (req, res) {
    const professor = new this.Professor(req.body)

    return professor.save()
      .then(() => res.status(201).send(professor))
      .catch(err => res.status(422).send(err.message))
  }
  readAll (req, res) {
    return this.Professor.find({})
      .then((professors) => res.send(professors))
      .catch(err => res.status(422).send(err.message))
  }
  updateProfessor (req, res) {
    return this.Professor.findOneAndUpdate({ _id: req.params.id}, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }
}

export default ProfessorController

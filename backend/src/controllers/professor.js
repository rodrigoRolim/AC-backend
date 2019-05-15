import mongoose from 'mongoose'
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
    const { params: { id }} = req
 
    return this.Professor.findOneAndUpdate({ _id: id}, req.body)
      .then((professor) => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }
  unsetGraduation (req, res) {
    console.log(req.params.id)
    return this.Professor.findOneAndUpdate({graduation: req.params.id}, { $unset: { graduation: req.params.id }})
      .then((professor) => res.sendStatus(200))
      .catch((err) => res.status(400).send(err.message))
  }
}

export default ProfessorController

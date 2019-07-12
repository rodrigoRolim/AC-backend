class ProfessorController {
  constructor (Professor, jwt, compare) {
    this.Professor = Professor
    this.jwt = jwt
    this.compare = compare
  }
  login (req, res) {

    return this.Professor.findOne({ name: req.body.name })
      .then((professor) => {

        this.compare(req.body.password, professor.password)
          .then((resp) => {

            if (resp) {

              const _id = professor._id
              const token = this.jwt.sign({ _id }, process.env.SECRET || process.env.ci.example, { expiresIn: 86400 })

              res.status(201).send({ token: token, auth: resp, user: professor })

            } else {
              res.status(404).send('No authorization')
            }
          })
      })
      .catch((err) => res.status(400).send(err.message))
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

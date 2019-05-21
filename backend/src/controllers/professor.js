class ProfessorController {
  constructor (Professor, jwt, compare) {
    this.Professor = Professor
    this.jwt = jwt
    this.compare = compare
  }
  loginProfessor (req, res) {

    return this.Professor.findOne({ name: req.body.name })
      .then((professor) => {

        this.compare(req.body.password, professor.password)
          .then((resp) => {

            if (resp) {

              const _id = professor._id
              const token = this.jwt.sign({ _id }, process.env.SECRET, { expiresIn: 86400 })

              res.status(201).send({ access: { token: token, auth: resp, tag: 1 }, user: professor })
            } else {
              res.status(404).send('No authorization')
            }
          })
      })
      .catch((err) => res.status(400).send(err.message))
  }
  createProfessor (req, res) {
    const professor = new this.Professor(req.body)
    console.log(professor)
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
  updateProfessor (req, res) {
    const { params: { id }} = req
 
    return this.Professor.findOneAndUpdate({ _id: id}, req.body)
      .then((professor) => res.sendStatus(200))
      .catch(err => res.status(422).send(err.message));
  }
  unsetGraduation (req, res) {
    return this.Professor.findOneAndUpdate({graduation: req.params.id}, { $unset: { graduation: req.params.id }})
      .then((professor) => res.sendStatus(200))
      .catch((err) => res.status(400).send(err.message))
  }
}

export default ProfessorController

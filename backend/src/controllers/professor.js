class ProfessorController {
  constructor (Professor, jwt, compare) {
    this.Professor = Professor
    this.jwt = jwt
    this.compare = compare
  }
  loginProfessor (req, res) {
    console.log(req.body)
    return this.Professor.findOne({ name: req.body.name })
      .then((professor) => {
        console.log(professor)
        this.compare(req.body.password, professor.password)
          .then((resp) => {
            console.log(resp)
            if (resp) {
              console.log(resp)
              const _id = professor._id
              const token = this.jwt.sign({ _id }, process.env.SECRET, { expiresIn: 86400 })
              console.log(resp)
              res.send({ token: token, auth: resp })
            } else {
              res.status(404).send('No authorization')
            }
          })
      })
      .catch((err) => res.status(400).send(err.message))
  }
  createProfessor (req, res) {
      
    const professor = new this.Professor(req.body)

    return professor.save()
      .then((professor) => {
        res.status(201).send(professor)
      })
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

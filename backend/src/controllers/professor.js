class ProfessorController {
  constructor (Professor) {
    this.Professor = Professor
  }
  createProfessor (req, res) {
    const professor = new this.Professor(req.body)

    return professor.save()
      .then(() => res.status(201).send(professor))
  }
}

export default ProfessorController
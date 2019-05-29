class DocumentController {
  constructor (Document, path, fs) {
    this.Document = Document
    this.path = path
    this.fs = fs
  }
  create (req, res) {

    const docJson = JSON.parse(req.body.document)
    docJson.path = req.file.path
    const document = new this.Document(docJson)
    return document.save()
      .then(() => res.status(201).send(document))
      .catch((err) => res.status(422).send(err.message)) 
  }
  // lembre-se: vc ainda não fez a rotar de deletar documento e vc tem que excluir o pdf também
  delete (req, res) {
    console.log(req)
    return this.Document.remove({ _id: req.params.id })
      .then(() => res.sendStatus(204))
      .catch((err) => res.status(400).send(err.message)) // implementar o deleta documento na pasta upload
  }
  readAll (req, res) {

    return this.Document.find({})
      .then((documents) => res.send(documents))
      .catch((err) => res.status(400).send(err.message))
  }
  // implementar a rota dessa função
  getFile (req, res) {

    const fileLocation = this.path.join(__dirname, '..', '..', req.params.file)
    return this.fs.access(fileLocation, this.fs.F_OK)
      .then(() => res.sendFile(fileLocation))
      .catch((err) => res.status(400).send(err.message))
  } 
  
}

export default DocumentController

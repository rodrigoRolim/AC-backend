class DocumentController {

  constructor (Document, path, fs) {

    this.Document = Document
    this.path = path
    this.fs = fs
  }
  create (req, res) {

    const docJson = JSON.parse(req.body.document)
    docJson.path = req.file.path // change for filename
    const document = new this.Document(docJson)
    return document.save()
      .then(() => res.status(201).send(document))
      .catch((err) => res.status(422).send(err.message)) 
  }
  delete (req, res) {
    const file = this.path.join('uploads', req.params.file)
    console.log(file)
    return this.Document.remove({ path: file })
      .then(() => {
        
        const pathname = this.path.join(__dirname, '..', '..', 'uploads', req.params.file)
        this.fs.unlink(pathname)
          .then(() => res.sendStatus(204))
          .catch((err) => res.status(404).send(err.message))
      })
      .catch((err) => res.status(400).send(err.message))
  }
  readAll (req, res) {

    return this.Document.find({})
      .then((documents) => res.send(documents))
      .catch((err) => res.status(400).send(err.message))
  }
  getFile (req, res) {

    const fileLocation = this.path.join(__dirname, '..', '..', 'uploads', req.params.file)
    return this.fs.access(fileLocation, this.fs.F_OK)
      .then(() => res.sendFile(fileLocation))
      .catch((err) => res.status(400).send(err.message))
  }
  getById (req, res) {
    const { params : { id }} = req

    return this.Document.find({ _id: id })
      .then((document) => res.send(document))
  }
}

export default DocumentController

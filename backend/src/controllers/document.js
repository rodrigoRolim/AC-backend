class DocumentController {
  constructor (Document) {
    this.Document = Document
  }
  create (req, res) {
    const document = new this.Document(req.body)

    return document.save()
      .then(() => res.status(201).send(document))
      .catch((err) => res.status(422).send(err.message))
  }
}

export default DocumentController

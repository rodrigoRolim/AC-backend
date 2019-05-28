// import path from 'path'
class DocumentController {
  constructor (Document, open) {
    this.Document = Document
    this.open = open
  }
  create (req, res) {
    
    const docJson = JSON.parse(req.body.document)
    docJson.path = req.file.path
    const document = new this.Document(docJson)
    return document.save()
      .then(() => res.status(201).json(req.file))
      .catch((err) => res.status(422).send(err.message)) 
  }
  /* getDocument (req, res) {
    const fileLocation = path.join(__dirname, '..', '..', "uploads/5d84f64f162636bd7ad51112c6c9a059")
    console.log(fileLocation)
    return res.sendFile(fileLocation)
  } */
}

export default DocumentController

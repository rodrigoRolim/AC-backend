class DocumentService {
  constructor (Document, fs, path) {
    this.Document = Document
    this.fs = fs
    this.path = path
  }
  removeAllDocumentsByStudent (documents) {
    documents.map((doc) => {
      const pathname = this.path.join(__dirname, '..', '..', 'uploads', document.path)
      this.fs.unlink(pathname)
        .then(() => 204)
    })
  }
}
import Document from '../models/document'
export default {
  isSent: (req, res, next) => {
    try {
      const doc = Document.findOne({ student: req.params.id })
      if (!doc.sent) {
        res.status(403).send('o documento não pode ser excluído ou atualizado')
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  }
}
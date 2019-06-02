import Document from '../models/document'
export default {
  isSent: (req, res, next) => {
    try {
      const doc = Document.findOne({ _id: req.params.id})
      if (doc.sent) {
        res.status(403).send('o documento não pode mais ser excluído ou atualizado')
      } else {
        next()
      }
    } catch (err) {
      next()
    }
  }
}
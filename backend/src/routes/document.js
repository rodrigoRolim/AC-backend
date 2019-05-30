import express from 'express'
import DocumentController from '../../src/controllers/document'
import Document from '../../src/models/document'
import verify from '../auth'
import multer from 'multer'
import fs from 'mz/fs'
import path from 'path'

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf"]

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type")
    error.code = "LIMIT_FILE_TYPES"
    return cb(error, false)
  }
  cb(null, true)
}
const MAX_SIZE = 20000000
const upload = multer({
  dest: './uploads/',
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
})

const router = express.Router()
const documentController = new DocumentController(Document, path,fs)

router.post('/add', upload.single('file'), (req, res) => documentController.create(req, res))
router.get('/all', (req, res) => documentController.readAll(req, res))
router.get('/uploads/:file', (req, res) => documentController.getFile(req, res))
router.delete('/uploads/:file', (req, res) => documentController.delete(req, res))

router.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Somente pdfs são pertmitidos" })
    return
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: `Muito largo. Tamanho máximo: ${MAX_SIZE/1000}Kb` })
    return
  }
})
export default router

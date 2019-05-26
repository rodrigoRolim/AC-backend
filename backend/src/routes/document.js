import express from 'express'
import DocumentController from '../../src/controllers/document'
import Document from '../../src/models/document'
import verify from '../auth'
import multer from 'multer'
import fs from 'fs'
import Util from 'util'

const open = Util.promisify(fs.open)

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf"]

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Wrong file type")
    error.code = "LIMIT_FILE_TYPES"
    return cb(error, false)
  }
  cb(null, true)
}
const MAX_SIZE = 200000
const upload = multer({
  dest: './uploads/',
  fileFilter,
  limits: {
    fileSize: MAX_SIZE
  }
})

const router = express.Router()
const documentController = new DocumentController(Document, open)

router.post('/add', upload.single('file'), (req, res) => documentController.create(req, res))
router.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "Only pdf are allowed" })
    return
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: `Too large. Max size is${MAX_SIZE}` })
    return
  }
})
export default router

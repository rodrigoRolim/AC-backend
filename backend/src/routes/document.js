import express from 'express'
import DocumentController from '../controllers/document'
import Document from '../models/document'
import StudentMiddle from '../middleware/student'
import verify from '../auth'
import multer from 'multer'
import fs from 'mz/fs'
import path from 'path'
import Pusher from 'pusher'

/* var pusher = new Pusher({
  appId: '795627',
  key: '9dc5a8662a93a62e45bb',
  secret: 'a884fc3b107158db9674',
  cluster: 'us2',
  useTLS: true
}); */

/* pusher.trigger('my-channel', 'my-event', {
  "message": "hello world"
}); */
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
// passar o pusher no construtor
const documentController = new DocumentController(Document, path,fs)


router.post('/add', verify.verifyJWT, upload.single('file'), (req, res) => documentController.create(req, res))
router.get('/all/:id', verify.verifyJWT, (req, res) => documentController.readAll(req, res))
router.get('/all/sents/:id', verify.verifyJWT, (req, res) => documentController.readAllSents(req, res))
router.get('/uploads/:file', verify.verifyJWT, (req, res) => documentController.getFile(req, res))
router.get('/:id', verify.verifyJWT, (req, res) => documentController.getById(req, res))
router.delete('/uploads/:file', verify.verifyJWT, (req, res) => documentController.delete(req, res))
router.put('/update/:id', verify.verifyJWT, (req, res) => documentController.update(req, res))
router.put('/sent/:id', verify.verifyJWT, StudentMiddle.approved, (req, res) => documentController.sent(req, res))

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

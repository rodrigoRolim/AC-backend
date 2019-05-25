import express from 'express'
import DocumentController from '../../src/controllers/document'
import Document from '../../src/models/document'
import verify from '../auth'

const router = express.Router()
const documentController = new DocumentController(Document)

router.post('/add', (req, res) => documentController.create(req, res))

export default router

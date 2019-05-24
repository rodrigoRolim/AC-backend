import express from 'express'
import GraduationController from '../controllers/graduation'
import Graduation from '../models/graduation'
import verify from '../auth'

const router = express.Router()
const graduationController = new GraduationController(Graduation)

router.post('/admin', verify.verifyJWT, (req, res) => graduationController.create(req, res))
router.get('/admin', (req, res) => graduationController.readAll(req, res))
router.delete('/admin/:id', verify.verifyJWT, (req, res) => graduationController.delete(req, res))
router.put('/admin/:id', verify.verifyJWT, (req, res) => graduationController.update(req, res))

export default router

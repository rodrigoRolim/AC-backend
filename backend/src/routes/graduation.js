import express from 'express'
import DegreeController from '../controllers/degree'
import Degree from '../models/graduation'
import verify from '../auth'

const router = express.Router()
const degreeController = new DegreeController(Degree)

router.post('/admin', verify.verifyJWT, (req, res) => degreeController.createDegree(req, res))
router.get('/admin', verify.verifyJWT, (req, res) => degreeController.readAll(req, res))
router.delete('/admin/:id', verify.verifyJWT, (req, res) => degreeController.delete(req, res))
router.put('/admin/:id', verify.verifyJWT, (req, res) => degreeController.updateDegree(req, res))

export default router
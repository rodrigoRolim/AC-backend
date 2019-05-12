import express from 'express'
import DegreeController from '../controllers/degree'
import Degree from '../models/degree'
import verify from '../auth'

const router = express.Router()
const degreeController = new DegreeController(Degree)

router.post('/admin/home', verify.verifyJWT, (req, res) => degreeController.createDegree(req, res))
router.get('/admin/home', verify.verifyJWT, (req, res) => degreeController.readAll(req, res))
router.delete('/admin/home/:id', verify.verifyJWT, (req, res) => degreeController.delete(req, res))
router.put('/admin/home/:id', verify.verifyJWT, (req, res) => degreeController.updateDegree(req, res))

export default router
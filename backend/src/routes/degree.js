import express from 'express'
import DegreeController from '../controllers/degree'
import Degree from '../models/degree'

const router = express.Router()
const degreeController = new DegreeController(Degree)

router.post('/admin/home', (req, res) => degreeController.createDegree(req, res))
router.get('/admin/home', (req, res) => degreeController.readAll(req, res))

export default router
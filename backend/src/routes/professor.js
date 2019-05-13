import express from 'express'
import verify from '../auth'
import ProfessorController from '../../src/controllers/professor';
import Professor from '../models/professor'

const router = express.Router()
const professorController = new ProfessorController(Professor)

router.post('/admin/home', verify.verifyJWT, (req, res) => professorController.createProfessor(req, res))
router.get('/admin/home', verify.verifyJWT,(req, res) => professorController.readAll(req, res))

export default router

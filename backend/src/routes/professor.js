import express from 'express'
import verify from '../auth'
import ProfessorController from '../../src/controllers/professor';
import Professor from '../models/professor'

const router = express.Router()
const professorController = new ProfessorController(Professor)

router.post('/admin', verify.verifyJWT, (req, res) => professorController.createProfessor(req, res))
router.get('/admin', verify.verifyJWT, (req, res) => professorController.readAll(req, res))
router.put('/admin/:id', verify.verifyJWT, (req, res) => professorController.updateProfessor(req, res))
router.put('/admin/unset/graduation/:id', (req, res) => professorController.unsetGraduation(req, res))
export default router

import express from 'express'
import verify from '../auth'
import ProfessorController from '../../src/controllers/professor';
import Professor from '../models/professor'
import Util from 'util'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const compare = Util.promisify(bcrypt.compare)
const router = express.Router()

const professorController = new ProfessorController(Professor, jwt, compare)

router.post('/admin', verify.verifyJWT, (req, res) => professorController.create(req, res))
router.post('/login', (req, res) => professorController.login(req, res))
router.get('/admin', verify.verifyJWT, (req, res) => professorController.readAll(req, res))
router.put('/admin/:id', verify.verifyJWT, (req, res) => professorController.update(req, res))
router.put('/admin/unset/graduation/:id', (req, res) => professorController.unsetGraduation(req, res)) // excluir!

export default router

import express from 'express'
import verify from '../auth'
import ProfessorController from '../../src/controllers/professor';
import Professor from '../models/professor'
import Util from 'util'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Authorization from '../services/auth'

const compare = Util.promisify(bcrypt.compare)
const router = express.Router()
const authotization = new Authorization(jwt, compare)
const professorController = new ProfessorController(Professor, authotization)

router.post('/add', (req, res) => professorController.create(req, res))
router.post('/login', (req, res) => professorController.login(req, res))
router.get('/all', verify.verifyJWT, (req, res) => professorController.readAll(req, res))
router.put('/update/:id', verify.verifyJWT, (req, res) => professorController.update(req, res))
router.put('/admin/unset/graduation/:id', (req, res) => professorController.unsetGraduation(req, res)) // excluir!
router.get('/:id', verify.verifyJWT, (req, res) => professorController.getById(req, res))
router.delete('/delete/:id', verify.verifyJWT, (req, res) => professorController.remove(req, res))

export default router

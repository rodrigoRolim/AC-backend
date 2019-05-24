import express from 'express'
import ProfessorController from '../../src/controllers/professor';
import Professor from '../models/professor'
import Util from 'util'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const compare = Util.promisify(bcrypt.compare)
const router = express.Router()

const professorController = new ProfessorController(Professor, jwt, compare)

router.post('/login', (req, res) => professorController.login(req, res))
router.post('/create', (req, res) => professorController.create(req, res)) // crie os testes

export default router

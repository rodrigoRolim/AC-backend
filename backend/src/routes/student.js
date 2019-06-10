import express from 'express'
import StudentController from '../controllers/student'
import Student from '../models/student'
import verify from '../auth'
import Util from 'util'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const castingId = mongoose.Types
const compare = Util.promisify(bcrypt.compare)
const router = express.Router()
const studentController = new StudentController(Student, jwt, compare, castingId)

router.post('/add', (req, res) => studentController.create(req, res))
router.post('/login', (req, res) => studentController.login(req, res))
router.get('/all/department/:id', verify.verifyJWT, (req, res) => studentController.getStudentsOfDepartment(req, res))
router.put('/update/situation/:id', verify.verifyJWT, (req, res) => studentController.setSituation(req, res))
router.get('/situation/:id', verify.verifyJWT, (req, res) => studentController.getSituation(req, res))
router.post('/launch/all', verify.verifyJWT, (req, res) => studentController.launchAll(req, res))
router.put('/update/:id', verify.verifyJWT, (req, res) => studentController.update(req, res))
router.get('/:id', verify.verifyJWT, (req, res) => studentController.getById(req, res))
router.delete('/delete/:id', verify.verifyJWT, (req, res) => studentController.remove(req, res))

export default router

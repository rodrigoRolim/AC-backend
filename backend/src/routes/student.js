import express from 'express'
import StudentController from '../controllers/student'
import Student from '../models/student'
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
router.get('/all/department/:id', (req, res) => studentController.getStudentsOfDepartment(req, res))

export default router

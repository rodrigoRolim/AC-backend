import express from 'express'
import StudentController from '../controllers/student'
import Student from '../models/student'
import jwt from 'jsonwebtoken'

const router = express.Router()
const studentController = new StudentController(Student, jwt)

router.post('/add', (req, res) => studentController.create(req, res))

export default router

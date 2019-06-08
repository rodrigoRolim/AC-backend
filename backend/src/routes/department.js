import express from 'express'
import DepartmentController from '../controllers/department'
import Department from '../models/department'
import verify from '../auth'
import verifyRelathionship from  '../middleware/verifyRelathionships'

const router = express.Router()
const departmentController = new DepartmentController(Department)

router.post('/add', verify.verifyJWT, (req, res) => departmentController.create(req, res))
router.get('/all', verify.verifyJWT,(req, res) => departmentController.readAll(req, res))
router.put('/update/:id', verify.verifyJWT, (req, res) => departmentController.update(req, res))
router.delete('/delete/:id', verify.verifyJWT, verifyRelathionship.relationsGraduations, (req, res) => departmentController.delete(req, res))

export default router

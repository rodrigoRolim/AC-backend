import express from 'express'
import DepartmentController from '../controllers/department'
import Department from '../models/department'
import verify from '../auth'

const router = express.Router()
const departmentController = new DepartmentController(Department)

router.post('/add', (req, res) => departmentController.create(req, res))
router.get('/all', (req, res) => departmentController.readAll(req, res))
router.put('/update/:id', (req, res) => departmentController.update(req, res))
router.delete('/delete/:id', (req, res) => departmentController.delete(req, res))

export default router

import express from 'express'
import DepartmentController from '../controllers/department'
import Department from '../models/department'
import jwt from 'jsonwebtoken'

const router = express.Router()
const departmentController = new DepartmentController(Department, jwt)

router.post('/admin', (req, res) => departmentController.create(req, res))
router.get('/admin', (req, res) => departmentController.readAll(req, res))
router.put('/admin/:id', (req, res) => departmentController.update(req, res))
router.delete('/admin/:id', (req, res) => departmentController.delete(req, res))
export default router

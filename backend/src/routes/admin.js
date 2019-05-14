import express from 'express'
import AdminController from '../controllers/admin'
import Admin from '../models/admin'
import jwt from 'jsonwebtoken'

const router = express.Router()
const adminController = new AdminController(Admin, jwt)

router.post('/login', (req, res) => adminController.post(req, res))

export default router

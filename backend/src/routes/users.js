import express from 'express'
import UsersController from '../controllers/users'

const router = express.Router()
const usersController = new UsersController()

router.post('/admin/login', (req, res) => usersController.post(req, res))

export default router
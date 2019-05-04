import express from 'express'
import UsersController from '../controllers/users'
import User from '../models/users'

const router = express.Router()
const usersController = new UsersController(User)

router.post('/admin/login', (req, res) => usersController.post(req, res))

export default router
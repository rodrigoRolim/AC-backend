import express from 'express'
import GroupItemsController from '../controllers/groupitem'
import Group from '../models/group'

const router = express.Router()
const groupItemsController = new GroupItemsController(Group)

router.put('/admin/:id', (req, res) => groupItemsController.addItem(req, res))

export default router

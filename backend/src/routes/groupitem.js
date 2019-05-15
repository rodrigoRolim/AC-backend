import express from 'express'
import GroupItemsController from '../controllers/groupitem'
import Group from '../models/group'

const router = express.Router()
const groupItemsController = new GroupItemsController(Group)

router.post('/admin', (req, res) => groupItemsController.createGroup(req, res))
router.put('/admin/:id', (req, res) => groupItemsController.addItem(req, res))
router.get('/admin', (req, res) => groupItemsController.getAll(req, res))
router.delete('/admin/:id', (req, res) => groupItemsController.remove(req, res))

export default router

import express from 'express'
import GroupItemsController from '../controllers/groupitem'
import Group from '../models/group'
import verify from '../auth'

const router = express.Router()
const groupItemsController = new GroupItemsController(Group)

router.post('/admin', verify.verifyJWT, (req, res) => groupItemsController.createGroup(req, res))
router.put('/admin/add/item/:id', verify.verifyJWT, (req, res) => groupItemsController.addItem(req, res))
router.get('/admin', verify.verifyJWT, (req, res) => groupItemsController.getAll(req, res))
router.delete('/admin/:id', (req, res) => groupItemsController.remove(req, res))
router.put('/admin/update/item/:id', verify.verifyJWT, (req, res) => groupItemsController.updateItem(req, res))
router.put('/admin/:id', verify.verifyJWT, (req, res) => groupItemsController.updateGroup(req, res))
router.put('/admin/remove/item/:id', verify.verifyJWT, (req, res) => groupItemsController.removeItem(req, res))

export default router

import express from 'express'
import GroupItemsController from '../controllers/groupitem'
import Group from '../models/group'
import verify from '../auth'

const router = express.Router()
const groupItemsController = new GroupItemsController(Group)

router.post('/admin', verify.verifyJWT, (req, res) => groupItemsController.create(req, res))
router.put('/admin/add/item/:id', verify.verifyJWT, (req, res) => groupItemsController.pushItem(req, res))
router.get('/admin', verify.verifyJWT, (req, res) => groupItemsController.readAll(req, res))
router.delete('/admin/:id', verify.verifyJWT, (req, res) => groupItemsController.delete(req, res))
router.put('/admin/update/item/:id', verify.verifyJWT, (req, res) => groupItemsController.updateItem(req, res))
router.put('/admin/:id', verify.verifyJWT, (req, res) => groupItemsController.update(req, res))
router.put('/admin/remove/item/:id', verify.verifyJWT, (req, res) => groupItemsController.pullItem(req, res))

export default router

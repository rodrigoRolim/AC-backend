import express from 'express'
import GroupItemsController from '../controllers/groupitem'
import Group from '../models/group'
import verify from '../auth'

const router = express.Router()
const groupItemsController = new GroupItemsController(Group)

router.post('/add', verify.verifyJWT, (req, res) => groupItemsController.create(req, res))
router.put('/add/item/:id', verify.verifyJWT, (req, res) => groupItemsController.pushItem(req, res))
router.get('/all', verify.verifyJWT, (req, res) => groupItemsController.readAll(req, res))
router.delete('/delete/:id', verify.verifyJWT, (req, res) => groupItemsController.delete(req, res))
router.put('/update/item/:id', verify.verifyJWT, (req, res) => groupItemsController.updateItem(req, res))
router.put('/update/:id', verify.verifyJWT, (req, res) => groupItemsController.update(req, res))
router.put('/delete/item/:id', verify.verifyJWT, (req, res) => groupItemsController.pullItem(req, res))
router.get('/:name', verify.verifyJWT, (req, res) => groupItemsController.getByName(req, res))

export default router

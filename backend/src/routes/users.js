import express from 'express'

const router = express.Router()

router.post('/admin/login', (req, res) => res.send([]))

export default router
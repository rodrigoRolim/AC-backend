import express from 'express'

const router = express.Router()

router.post('/admin/login', (req, res) => res.send([{
  token: 'asdf10',
  msg: true
}]))

export default router
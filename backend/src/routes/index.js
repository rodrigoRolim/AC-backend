import express from 'express';
import usersRoute from './users'
import degreesRoute from './degree'

const router = express.Router();

router.use('/users', usersRoute)
router.use('/degrees', degreesRoute)
router.get('/', (req, res) => res.send("hello"));

export default router;
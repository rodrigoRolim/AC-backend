import express from 'express';
import usersRoute from './users'
import degreesRoute from './degree'
import professorRoute from './professor'

const router = express.Router();

router.use('/users', usersRoute)
router.use('/degrees', degreesRoute)
router.use('/professor', professorRoute)
router.get('/', (req, res) => res.send("hello"));

export default router;
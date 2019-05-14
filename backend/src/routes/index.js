import express from 'express';
import adminRoute from './admin'
import degreesRoute from './graduation'
import professorRoute from './professor'

const router = express.Router();

router.use('/', adminRoute)
router.use('/degrees', degreesRoute)
router.use('/professor', professorRoute)

export default router;
import express from 'express';
import adminRoute from './admin'
import degreesRoute from './graduation'
import professorRoute from './professor'

const router = express.Router();

router.use('/admin', adminRoute)
router.use('/degrees', degreesRoute)
router.use('/professor', professorRoute)

export default router;
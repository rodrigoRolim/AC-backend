import express from 'express';
import adminRoute from './admin'
import degreesRoute from './graduation'
import professorRoute from './professor'
import groupsItemsRoute from './groupitem'
import studentRoute from './student'
import departmentRoute from './department'

const router = express.Router();

router.use('/admin', adminRoute)
router.use('/degrees', degreesRoute)
router.use('/professor', professorRoute)
router.use('/group', groupsItemsRoute)
router.use('/student', studentRoute)
router.use('/department', departmentRoute)
export default router;

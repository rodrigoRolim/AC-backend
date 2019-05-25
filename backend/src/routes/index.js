import express from 'express';
import adminRoute from './admin'
import graduationRoute from './graduation'
import professorRoute from './professor'
import groupsItemsRoute from './groupitem'
import studentRoute from './student'
import departmentRoute from './department'
import documentRoute from './document'

const router = express.Router();

router.use('/admin', adminRoute)
router.use('/graduation', graduationRoute)
router.use('/professor', professorRoute)
router.use('/group', groupsItemsRoute)
router.use('/student', studentRoute)
router.use('/department', departmentRoute)
router.use('/document', documentRoute)

export default router;

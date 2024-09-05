import { Router } from 'express';
import { createApplication, getApplicationsByJobId } from '../controllers/ApplicationController';
const router = Router();

router.post('/add_apply', createApplication);
router.get('/job/:jobId', getApplicationsByJobId);
export default router;
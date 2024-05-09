import { Router } from 'express';
import * as jobController from "../controllers/JobControlers"
const router = Router();

router.post('/jobs', jobController.createJob);

export default router;

import { Router } from 'express';
import * as jobController from "../controllers/JobControlers"
const router = Router();

router.post('/add_job', jobController.createOffer);
router.get('/offers',jobController.getAllOffers);

export default router;

import { Router } from 'express';
import * as ApplicationController from "../controllers/ApplicationController"
const router = Router();

router.post('/add_apply', ApplicationController.createApplication);
export default router;
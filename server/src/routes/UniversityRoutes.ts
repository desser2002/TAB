import express from 'express';
import * as UniversityController from "../controllers/UniversityConstroller"

const router = express.Router();

router.post('/add/', UniversityController.createUniversity);

export default router;

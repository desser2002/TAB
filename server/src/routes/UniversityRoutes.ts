import express from 'express';
import * as UniversityController from "../controllers/University"

const router = express.Router();

router.post('/add/', UniversityController.createUniversity);

export default router;

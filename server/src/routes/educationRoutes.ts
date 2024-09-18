// routes/educationRoutes.ts
import express from 'express';
import { addEducation, getEducationByUserId } from '../controllers/educationController';

const router = express.Router();

// Добавить образование
router.post('/education', addEducation);

// Получить данные об образовании по userId
router.get('/education/:userId', getEducationByUserId);

export default router;

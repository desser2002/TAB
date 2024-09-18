// routes/workExperienceRoutes.ts
import express from 'express';
import { addWorkExperience, getWorkExperienceByUserId } from '../controllers/workExperienceController';

const router = express.Router();

// Добавить опыт работы
router.post('/work-experience', addWorkExperience);

// Получить опыт работы по userId
router.get('/work-experience/:userId', getWorkExperienceByUserId);

export default router;

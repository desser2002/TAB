import express from 'express';
import { createAdmin, findAdminsByCompanyId, findCompaniesByUserId } from '../controllers/AdminsController';

const router = express.Router();

// Роут для создания нового администратора
router.post('/create', createAdmin);

// Роут для поиска ID кампаний по ID пользователя
router.get('/companies/:userId', findCompaniesByUserId);
router.get('/company/:companyId', findAdminsByCompanyId);



export default router;

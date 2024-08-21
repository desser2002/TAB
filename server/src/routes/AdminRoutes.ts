import express from 'express';
import { createAdmin, findAdminsByCompanyId, findCompaniesByUserId } from '../controllers/AdminsController';

const router = express.Router();

// Роут для создания нового администратора
router.post('/admin', createAdmin);

// Роут для поиска ID кампаний по ID пользователя
router.get('/admin/companies/:userId', findCompaniesByUserId);
router.get('/admins/company/:companyId', findAdminsByCompanyId);



export default router;

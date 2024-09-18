import express from 'express';
import { createAdmin, findAdminsByCompanyId, findCompaniesByUserId, deleteAdminById } from '../controllers/AdminsController';

const router = express.Router();

// Роут для создания нового администратора
router.post('/create', createAdmin);

// Роут для поиска ID кампаний по ID пользователя
router.get('/companies/:userId', findCompaniesByUserId);

// Роут для поиска администраторов по ID компании
router.get('/company/:companyId', findAdminsByCompanyId);

// Роут для удаления администратора по ID
router.delete('/delete/:adminId', deleteAdminById);

export default router;

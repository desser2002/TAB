import express from 'express';
import { createCompany, getCompanyNameById } from 'src/controllers/CompanyController';
import * as CompanyController from "../controllers/CompanyController"

const router = express.Router();

// Маршрут для получения названия компании по ID
router.get('/company/:id', CompanyController.getCompanyNameById);

// Маршрут для создания новой компании
router.post('/company/add', CompanyController.createCompany);

export default router;

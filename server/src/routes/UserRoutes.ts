// routes/userRoutes.ts
import express from 'express';
import * as UserController from '../controllers/UserController'


const router = express.Router();

// Маршрут регистрации пользователя
router.post('/register', UserController.registerUser);

export default router;

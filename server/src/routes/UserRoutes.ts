// routes/userRoutes.ts
import express from 'express';
import * as UserController from '../controllers/UserController'


const router = express.Router();

// Маршрут регистрации пользователя
router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/session-user/:sessionId', UserController.getUserBySessionId);

export default router;

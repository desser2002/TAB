import { Request, Response } from 'express';
import User from '../models/User';

// Функция регистрации пользователя
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Проверка на существование пользователя
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Пользователь уже существует' });
    }

    // Создание нового пользователя
    const user = new User({
      username,
      password // Сохраняем пароль без хеширования
    });

    // Сохранение пользователя в базе данных
    const savedUser = await user.save();

    // Возврат ID нового пользователя в ответе
    res.status(201).json({ message: 'Пользователь успешно зарегистрирован', userId: savedUser._id });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error });
  }
};

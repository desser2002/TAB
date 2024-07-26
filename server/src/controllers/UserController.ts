import { Request, Response } from 'express';
import MongoStore from 'connect-mongo';
import { User } from "../models/User"

// Получение доступа к хранилищу сессий
const mongoStore = MongoStore.create({
    mongoUrl: 'mongodb://localhost/yourdbname',
    collectionName: 'sessions',
});

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

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    // Поиск пользователя по имени пользователя
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(409).json({ message: 'Такого пользователя не существует' });
      return;
    }

    // Проверка пароля
    if (password !== existingUser.password) {
      res.status(401).json({ message: 'Неверный пароль' });
      return;
    }

    // Установка userId в сессию
    (req.session as any).userId = existingUser._id.toString();

    // Явное сохранение сессии
    req.session.save((err) => {
      if (err) {
        console.error('Failed to save session:', err);
        res.status(500).json({ message: 'Ошибка при сохранении сессии' });
        return;
      }

      // Возвращение успешного сообщения с userId и номером сессии
      res.status(200).json({
        message: 'Пользователь успешно вошел в систему',
        userId: existingUser._id.toString(),
        sessionID: req.sessionID  // Добавление идентификатора сессии в ответ
      });
    });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при входе в систему', error });
  }
};
export const getUserBySessionId = async (req: Request, res: Response) => {
  try {
    const sessionId = req.params.sessionId;

    // Получение данных сессии из MongoDB
    mongoStore.get(sessionId, (err, session) => {
      if (err || !session) {
        return res.status(404).json({ message: 'Session not found' });
      }

      // Приведение типов к any для доступа к userId
      const userId = (session as any).userId;

      if (userId) {
        res.json({ userId });
      } else {
        res.status(404).json({ message: 'User ID not found in session' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

  

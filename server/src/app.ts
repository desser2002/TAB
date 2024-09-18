import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes';
import jobRoutes from './routes/JobRoutes';
import companyRoutes from './routes/CompanyRoutes';
import userRoutes from './routes/UserRoutes';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import ApplicationRoutes from './routes/ApplicationRoutes';
import UniversityRoutes from './routes/UniversityRoutes';
import AdminRoutes from './routes/AdminRoutes';
import workExperienceRoutes from './routes/workExperienceRoutes'; // Импортируем роутер для работы
import educationRoutes from './routes/educationRoutes'; // Импортируем роутер для образования

// Инициализация приложения
const app: express.Express = express();
const port: number = 3000;
const uploadDir = path.join(__dirname, 'uploads');

// Создание директории для загрузок, если она не существует
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Directory created at ${uploadDir}`);
} else {
  console.log(`Directory already exists at ${uploadDir}`);
}

app.use(cors());
app.use(express.json());

// Настройка сессий
app.use(
  session({
    secret: 'verysecretvalue', // Установите секретное значение для подписания Cookie
    resave: false, // Не сохранять сессию, если она не изменена
    saveUninitialized: false, // Не сохранять "пустую" сессию
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost/yourdbname', // Укажите URL вашего MongoDB
      collectionName: 'sessions', // Имя коллекции для хранения сессий
    }),
    cookie: {
      httpOnly: true, // Недоступен через JavaScript на клиенте
      secure: false, // Для разработки, установите в true, если используете HTTPS
      maxAge: 1000 * 60 * 60 * 24, // Длительность сессии в миллисекундах (один день)
    },
  })
);

// Подключение маршрутов
app.use('/api', jobRoutes);
app.use('/api', companyRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/apply', ApplicationRoutes);
app.use('/api/university', UniversityRoutes);
app.use('/api/admins', AdminRoutes);
app.use('/api', workExperienceRoutes); // Маршрут для работы
app.use('/api', educationRoutes); // Маршрут для образования

// Подключение маршрута для скачивания файлов
app.get('/download/:filename', (req: Request, res: Response) => {
  const fileName = req.params.filename; // Получаем имя файла из URL
  const filePath = path.join(uploadDir, fileName); // Путь к файлу в папке uploads

  if (fs.existsSync(filePath)) {
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Ошибка при отправке файла:', err);
        res.status(500).send('Ошибка при отправке файла');
      }
    });
  } else {
    res.status(404).send('Файл не найден');
  }
});

// Подключение к базе данных и запуск сервера
mongoose
  .connect('mongodb://localhost/yourdbname', {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed', err);
  });

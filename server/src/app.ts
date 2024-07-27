import express from 'express';
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
import  UniversityRoutes from './routes/UniversityRoutes';

const app: express.Express = express();
const port: number = 3000;
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Directory created at ${uploadDir}`);
} else {
    console.log(`Directory already exists at ${uploadDir}`);
}

app.use(cors());
app.use(express.json());

// Настройка сессий
app.use(session({
  secret: 'verysecretvalue',  // Установите секретное значение для подписания Cookie
  resave: false,              // Не сохранять сессию, если она не изменена
  saveUninitialized: false,   // Не сохранять "пустую" сессию
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost/yourdbname', // Укажите URL вашего MongoDB
    collectionName: 'sessions', // Имя коллекции для хранения сессий
  }),
  cookie: {
    httpOnly: true,           // Недоступен через JavaScript на клиенте
    secure: false,            // Для разработки, установите в true, если используете HTTPS
    maxAge: 1000 * 60 * 60 * 24 // Длительность сессии в миллисекундах (здесь: один день)
  }
}));

app.use('/api', jobRoutes);
app.use('/api', companyRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);
app.use('/api/apply', ApplicationRoutes);
app.use('/api/university', UniversityRoutes);


mongoose.connect('mongodb://localhost/yourdbname', {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });

import express from 'express';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import fileRoutes from './routes/fileRoutes'; // Импорт нового файла маршрутов
import jobRoutes from './routes/JobRoutes';
import companyRoutes from './routes/CompanyRoutes';
import userRoutes from './routes/UserRoutes';  // Импорт маршрутов пользователя

const app: express.Express = express();
const port: number = 3000;
const uploadDir = path.join(__dirname, 'uploads');

// Проверяем, существует ли директория, и создаем ее, если необходимо
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Directory created at ${uploadDir}`);
} else {
    console.log(`Directory already exists at ${uploadDir}`);
}

app.use(cors());
app.use(express.json());

app.use('/api', jobRoutes);
app.use('/api', companyRoutes);
app.use('/api/files', fileRoutes); // Использование нового файла маршрутов
app.use('/api/users', userRoutes); // Использование правильного файла маршрутов пользователя

mongoose.connect('mongodb://localhost/yourdbname', {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });

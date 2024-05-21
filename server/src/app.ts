import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jobRoutes from "../src/routes/JobRoutes";
import companyRoutes from './routes/companyRoutes';


const app: Express = express();
const port: number = 3000;

// Настройка CORS
app.use(cors());

// Разбор JSON-запросов с помощью встроенного middleware Express
app.use(express.json());

// Подключение маршрутов
app.use('/api', jobRoutes);
app.use('/api', companyRoutes);

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/yourdbname', {})
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });
  
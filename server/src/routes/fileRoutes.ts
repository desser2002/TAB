// fileRoutes.ts
import express from 'express';
import multer from 'multer';



const router = express.Router();

// Настройка хранилища для Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads') // Убедитесь, что этот каталог существует
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop())
  }
});

const upload = multer({ storage: storage });

// Маршрут для загрузки файла
router.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log(req.file);
    res.status(200).json({
      message: "Файл успешно загружен",
      filePath: req.file.path
    });
  } else {
    res.status(400).send("Файл не загружен.");
  }
});

export default router;

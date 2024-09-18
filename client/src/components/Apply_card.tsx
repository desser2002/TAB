import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download"; // Импорт иконки Download

interface ApplicationCardProps {
  email: string;
  resumeUrl: string; // Полный путь к файлу, который приходит с сервера
}

// Компонент для отображения заявки и ссылки на скачивание резюме
const ApplicationCard: React.FC<ApplicationCardProps> = ({
  email,
  resumeUrl,
}) => {
  // Извлекаем только имя файла из полного пути
  const fileName = resumeUrl.split("\\").pop()?.split("/").pop();
  console.log(fileName);
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2">Email: {email}</Typography>
        <a
          href={`http://localhost:3000/download/${fileName}`} // Используем маршрут для загрузки файла с сервера
          download={fileName} // Устанавливаем имя загружаемого файла
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            startIcon={<DownloadIcon />}
          >
            Download Resume
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { ApplyT } from "../types/Apply";

const JobApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<ApplyT[]>([]);

  useEffect(() => {
    // Функция для получения списка откликов
    const fetchApplications = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/applications");
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
      }
    };

    fetchApplications();
  }, []);

  const handleViewCV = (cv_url: string) => {
    // Открыть ссылку на CV в новом окне
    window.open(cv_url, "_blank");
  };

  const handleDownloadCV = (cv_url: string) => {
    // Создать ссылку для скачивания CV
    const link = document.createElement("a");
    link.href = cv_url;
    link.download = "CV.pdf"; // Название файла
    link.click();
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Отклики на вакансии
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {applications.length > 0 ? (
          applications.map((application) => (
            <Card key={application.user + application.job} variant="outlined">
              <CardContent>
                <Typography variant="h6">Email: {application.email}</Typography>
                <Typography variant="body2">
                  User ID: {application.user}
                </Typography>
                <Typography variant="body2">
                  Job ID: {application.job}
                </Typography>

                <Box sx={{ marginTop: 2, display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewCV(application.cv_url)}
                  >
                    Просмотреть CV
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDownloadCV(application.cv_url)}
                  >
                    Скачать CV
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography>Отклики не найдены.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default JobApplicationsPage;

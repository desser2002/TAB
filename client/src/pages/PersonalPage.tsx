import { FC, useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Button,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Импорт для навигации
import StyledHeader from "../components/StyledHeader";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";
import { fetchUsername } from "../utils/getUserName";
import { getWorkExperienceByUserId } from "../utils/getWorkExperienceByUserId"; // Утилита для получения опыта работы
import { getEducationByUserId } from "../utils/getEducationByUserId"; // Утилита для получения данных об образовании

interface WorkExperience {
  position: string;
  company: string;
  startDate: string;
  endDate: string;
}

interface Education {
  university: string;
  specialization: string;
  startYear: number;
  endYear: number;
}

const PersonalPage: FC = () => {
  const [username, setUsername] = useState<string | null>(null); // Для хранения имени пользователя
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]); // Для хранения опыта работы
  const [education, setEducation] = useState<Education[]>([]); // Для хранения образования
  const [loading, setLoading] = useState<boolean>(true); // Для состояния загрузки
  const [error, setError] = useState<string | null>(null); // Для обработки ошибок
  const sessionID = localStorage.getItem("sessionID");
  const navigate = useNavigate(); // Навигация для переходов

  useEffect(() => {
    const loadUserData = async () => {
      if (sessionID) {
        try {
          // Шаг 1: Получаем userId по sessionID
          const userId = await fetchUserIdBySessionId(sessionID);
          if (userId) {
            // Шаг 2: Получаем username по userId
            const fetchedUsername = await fetchUsername(userId);
            const fetchedWorkExperience = await getWorkExperienceByUserId(
              userId
            );
            const fetchedEducation = await getEducationByUserId(userId);

            setUsername(fetchedUsername);
            setWorkExperience(fetchedWorkExperience);
            setEducation(fetchedEducation);
          } else {
            setError("Failed to load user ID");
          }
        } catch (error) {
          setError("Error fetching user data");
        } finally {
          setLoading(false); // Останавливаем индикатор загрузки
        }
      } else {
        setError("Session ID not found");
        setLoading(false); // Останавливаем индикатор загрузки
      }
    };

    loadUserData();
  }, [sessionID]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <StyledHeader />
      {/* Box для аватара и юзернейма */}
      <Box
        sx={{
          width: 120,
          height: 120,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 4,
          marginLeft: 35, // Сдвиг вправо на 200 пикселей
          borderRadius: 2,
          border: "1px solid lightgray", // Для демонстрации границы
        }}
      >
        <Avatar
          sx={{ width: 60, height: 60, marginBottom: 1 }} // Размер аватара
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="body1">{username || "User"}</Typography>{" "}
        {/* Юзернейм */}
      </Box>

      <Container maxWidth="sm">
        <Box
          sx={{
            paddingRight: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            marginTop: 4,
          }}
        >
          {/* Опыт работы */}
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Work Experience
          </Typography>
          {workExperience.length > 0 ? (
            workExperience.map((work, index) => (
              <Box key={index} sx={{ marginBottom: 4 }}>
                <Typography variant="body1">
                  {work.position} at {work.company}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {new Date(work.startDate).toLocaleDateString()} -{" "}
                  {work.endDate
                    ? new Date(work.endDate).toLocaleDateString()
                    : "Present"}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">
              No work experience added yet.
            </Typography>
          )}

          {/* Образование */}
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Education
          </Typography>
          {education.length > 0 ? (
            education.map((edu, index) => (
              <Box key={index} sx={{ marginBottom: 4 }}>
                <Typography variant="body1">
                  {edu.specialization} at {edu.university}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {edu.startYear} - {edu.endYear}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No education added yet.</Typography>
          )}

          {/* Кнопка для перехода на страницу добавления опыта */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/add-experience")}
          >
            Add Experience
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PersonalPage;

import { FC, useState, useEffect } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import StyledHeader from "../components/StyledHeader";
import { addWorkExperience } from "../utils/addWorkExperience";
import { addEducation } from "../utils/addEducation";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";
// Утилита для получения userId из сессии

const AddExperiencePage: FC = () => {
  const [userId, setUserId] = useState<string | null>(null); // Хранение userId
  const [loading, setLoading] = useState<boolean>(true);

  // Состояния для работы
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [workStartDate, setWorkStartDate] = useState("");
  const [workEndDate, setWorkEndDate] = useState("");

  // Состояния для образования
  const [university, setUniversity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [educationStartYear, setEducationStartYear] = useState("");
  const [educationEndYear, setEducationEndYear] = useState("");

  // Получаем userId из сессии
  useEffect(() => {
    const loadUserId = async () => {
      const sessionId = localStorage.getItem("sessionID"); // Предполагается, что sessionID хранится в localStorage
      if (sessionId) {
        try {
          const fetchedUserId = await fetchUserIdBySessionId(sessionId);
          setUserId(fetchedUserId);
        } catch (error) {
          console.error("Error fetching user ID:", error);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("Session ID not found");
        setLoading(false);
      }
    };
    loadUserId();
  }, []);

  const handleSaveWork = async () => {
    if (!userId) return;
    try {
      const workData = {
        userId,
        position,
        company,
        startDate: workStartDate,
        endDate: workEndDate,
      };
      await addWorkExperience(workData);
      console.log("Work experience saved");

      // Очищаем форму после успешного добавления
      setPosition("");
      setCompany("");
      setWorkStartDate("");
      setWorkEndDate("");
    } catch (error) {
      console.error("Failed to save work experience", error);
    }
  };

  const handleSaveEducation = async () => {
    if (!userId) return;
    try {
      const educationData = {
        userId,
        university,
        specialization,
        startYear: parseInt(educationStartYear),
        endYear: parseInt(educationEndYear),
      };
      await addEducation(educationData);
      console.log("Education saved");

      // Очищаем форму после успешного добавления
      setUniversity("");
      setSpecialization("");
      setEducationStartYear("");
      setEducationEndYear("");
    } catch (error) {
      console.error("Failed to save education", error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // Показываем индикатор загрузки
  }

  return (
    <div>
      <StyledHeader />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8, // Сдвигаем на 50 пикселей вниз
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" sx={{ marginBottom: 4 }}>
            Add Work Experience and Education
          </Typography>

          {/* Форма для работы */}
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Work Experience
          </Typography>
          <TextField
            label="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Start Date"
            type="date"
            value={workStartDate}
            onChange={(e) => setWorkStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="End Date"
            type="date"
            value={workEndDate}
            onChange={(e) => setWorkEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ marginBottom: 4 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveWork}
            sx={{ marginBottom: 4 }}
          >
            Save Work Experience
          </Button>

          {/* Форма для образования */}
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Education
          </Typography>
          <TextField
            label="University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Start Year"
            type="number"
            value={educationStartYear}
            onChange={(e) => setEducationStartYear(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="End Year"
            type="number"
            value={educationEndYear}
            onChange={(e) => setEducationEndYear(e.target.value)}
            fullWidth
            sx={{ marginBottom: 4 }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSaveEducation}
          >
            Save Education
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AddExperiencePage;

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import { Company } from "../types/Company";
import { createCompany } from "../utils/CreateCompany";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";
// Импортируем функцию из сервисного модуля

const industryOptions = [
  { value: "tech", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "health", label: "Healthcare" },
  // Добавьте другие отрасли по необходимости
];

const CreateCompanyForm: React.FC = () => {
  const initialFormData: Company = {
    name: "",
    location: "",
    industry: "",
  };

  const [formData, setFormData] = useState<Company>(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sessionId = localStorage.getItem("sessionID");
    if (sessionId) {
      const fetchedUserId = await fetchUserIdBySessionId(sessionId);

      try {
        const response = await createCompany(formData, fetchedUserId);
        console.log("Company created successfully:", response);
        setFormData(initialFormData); // Очистка формы после успешной отправки
        // Здесь можно добавить логику для отображения сообщения об успехе
      } catch (error) {
        console.error("Error creating company:", error);
        // Здесь можно добавить логику для отображения ошибки
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create New Company
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Company Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              select
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              variant="outlined"
            >
              {industryOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Company
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateCompanyForm;

import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { submitJobForm } from "../utils/submitJobForm";

interface FormData {
  title: string;
  description: string;
  requirements: string;
}

const JobForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    description: "",
    requirements: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitJobForm(formData); // Использование вынесенной функции
    setFormData({
      title: "",
      description: "",
      requirements: "",
    }); // Очистка формы
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "50vw", textAlign: "center" }}
      >
        <TextField
          fullWidth
          name="title"
          label="Название вакансии"
          variant="outlined"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="description"
          label="Описание"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="requirements"
          label="Требования"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={formData.requirements}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Создать вакансию
        </Button>
      </form>
    </Box>
  );
};

export default JobForm;

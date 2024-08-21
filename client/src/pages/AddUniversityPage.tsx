import React, { FC, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { addUniversity } from "../utils/addUniversity";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUniversityPage: FC = () => {
  const [universityName, setUniversityName] = useState("");
  const [location, setLocation] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniversityName(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        name: universityName,
        location: location,
      };
      await addUniversity(data);
      toast.success("University added successfully!");

      // Очистка формы
      setUniversityName("");
      setLocation("");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Add University
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="university-name"
            label="University Name"
            name="universityName"
            autoComplete="university-name"
            autoFocus
            value={universityName}
            onChange={handleNameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            autoComplete="location"
            value={location}
            onChange={handleLocationChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add University
          </Button>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddUniversityPage;

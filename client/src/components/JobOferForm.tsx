import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { submitJobForm } from "../utils/submitJobForm";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

interface FormData {
  title: string;
  short_description: string;
  full_description: string;
  location: string;
  salary: number;
  company: string;
  publication_date: Date;
}

const JobForm: React.FC = () => {
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    short_description: "",
    full_description: "",
    location: "",
    salary: 0,
    company: "664c5b4b66a54cd11e8bf2fd",
    publication_date: new Date(),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitJobForm(formData);
    setFormData({
      title: "",
      short_description: "",
      full_description: "",
      location: "",
      salary: 0,
      company: "664c5b4b66a54cd11e8bf2fd",
      publication_date: new Date(),
    }); // Clear Form
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
          label="Offer title"
          variant="outlined"
          margin="normal"
          value={formData.title}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="short_description"
          label="Short Description"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={formData.short_description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="full_description"
          label="Full Description"
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          value={formData.full_description}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location-select"
            name="location"
            value={formData.location}
            label="Location"
            style={{ textAlign: "left", textOverflow: "clip" }}
            onChange={handleSelectChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Katowie">Katowie</MenuItem>
            <MenuItem value="Gliwice">Gliwice</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          name="salary"
          label="Salary"
          type="number"
          variant="outlined"
          margin="normal"
          value={formData.salary}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Job Offer
        </Button>
      </form>
    </Box>
  );
};

export default JobForm;

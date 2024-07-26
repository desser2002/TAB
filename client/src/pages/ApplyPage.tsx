import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";

const ApplyPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
    // Further processing can be added here
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      // Here you can also handle file upload logic and update progress
      setUploadProgress(0); // Reset progress or start a fake progress update
      fakeUpload(file);
    }
  };

  const fakeUpload = (file: File) => {
    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Apply for Job</Typography>
      <TextField label="Name" required fullWidth sx={{ mt: 2 }} />
      <TextField label="Email" type="email" required fullWidth sx={{ mt: 2 }} />
      <TextField
        label="Cover Letter"
        multiline
        rows={4}
        fullWidth
        sx={{ mt: 2 }}
      />
      <Button variant="contained" component="label" sx={{ mt: 2 }}>
        Upload CV
        <input type="file" hidden onChange={handleFileChange} />
      </Button>
      {fileName && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">File: {fileName}</Typography>
          {uploadProgress < 100 ? (
            <LinearProgress variant="determinate" value={uploadProgress} />
          ) : (
            <Typography color="primary">Upload Complete!</Typography>
          )}
        </Box>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Submit Application
      </Button>
    </Box>
  );
};

export default ApplyPage;

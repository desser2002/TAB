import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Box,
  LinearProgress,
} from "@mui/material";
import { Apply } from "../utils/Apply";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";
import { uploadFile } from "../utils/Upload_file";

const ApplyPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const [email, setEmail] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [cvUrl, setCvUrl] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sessionId = localStorage.getItem("sessionID");

    if (sessionId && offerId) {
      const fetchedUserId = await fetchUserIdBySessionId(sessionId);
      try {
        const data = {
          cv_url: cvUrl,
          email: email,
          user: fetchedUserId,
          job: offerId, // Используем offerId из параметров маршрута
        };
        const result = await Apply(data);
        console.log(result);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        } else {
          console.log("An unknown error occurred");
        }
      }
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFileName(file.name);
      setUploadProgress(0); // Reset progress
      try {
        const url = await uploadFile(file);
        setCvUrl(url);
        setUploadProgress(100);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6">Apply for Job</Typography>
      <TextField
        label="Email"
        type="email"
        required
        fullWidth
        sx={{ mt: 2 }}
        value={email}
        onChange={handleEmailChange}
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

import { FC } from "react";
import {
  Avatar,
  Typography,
  Card,
  CardContent,
  Button,
  Container,
  Box,
} from "@mui/material";
import StyledHeader from "../components/StyledHeader";

const PersonalPage: FC = () => {
  const sessionID = localStorage.getItem("sessionID");
  console.log(sessionID);

  return (
    <div>
      <StyledHeader></StyledHeader>
      <Box
        sx={{
          paddingLeft: "12%",
          paddingTop: "3%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: 4,
        }}
      >
        {/* Rectangular background with rounded corners */}
        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            borderRadius: "16px",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 240,
            height: 240,
            marginBottom: 2,
          }}
        >
          <Avatar
            sx={{ width: 120, height: 120, marginBottom: 1, marginTop: 5 }}
            src="/static/images/avatar/1.jpg"
          />
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            John Doe
          </Typography>
        </Box>
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
          <Card raised sx={{ width: "140%", mt: 2 }}>
            <CardContent>
              <Typography variant="h6">Work Experience</Typography>
              <Typography variant="body1">
                Software Developer at XYZ Corp
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                June 2019 - Present
              </Typography>
              <Typography variant="body2">
                Responsible for developing and maintaining web applications
                using React and Node.js.
              </Typography>
            </CardContent>
          </Card>
          <Card raised sx={{ width: "140%", mt: 2 }}>
            <CardContent>
              <Typography variant="h6">Education</Typography>
              <Typography variant="body1">B.S. in Computer Science</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                University of Example, 2015 - 2019
              </Typography>
              <Typography variant="body2">Graduated with Honors.</Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Add Experiens
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PersonalPage;

import { FC } from "react";
import { Avatar, Typography, Button, Container, Box } from "@mui/material";
import StyledHeader from "../components/StyledHeader";

const PersonalPage: FC = () => {
  const sessionID = localStorage.getItem("sessionID");
  console.log(sessionID);

  return (
    <div>
      <StyledHeader />
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
        <Avatar
          sx={{ width: 120, height: 120, marginBottom: 1, marginTop: 5 }}
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          John Doe
        </Typography>
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
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Work Experience
          </Typography>
          <Typography variant="body1">
            Software Developer at XYZ Corp
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            June 2019 - Present
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 4 }}>
            Responsible for developing and maintaining web applications using
            React and Node.js.
          </Typography>

          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Education
          </Typography>
          <Typography variant="body1">B.S. in Computer Science</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            University of Example, 2015 - 2019
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 4 }}>
            Graduated with Honors.
          </Typography>

          <Button variant="contained" color="primary">
            Add Experience
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default PersonalPage;

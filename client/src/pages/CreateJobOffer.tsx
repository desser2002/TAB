import { FC } from "react";
import JobForm from "../components/JobOferForm";
import StyledHeader from "../components/StyledHeader";
import { Container, Typography, Box } from "@mui/material";

const CreateJobOffer: FC = () => {
  return (
    <>
      {/* Move the header to the top */}
      <StyledHeader />

      {/* Box to center the form and apply consistent styling */}
      <Box
        sx={{
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <JobForm />
      </Box>
    </>
  );
};

export default CreateJobOffer;

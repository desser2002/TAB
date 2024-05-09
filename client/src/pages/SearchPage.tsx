// SearchPage.tsx
import React from "react";
import { Grid, Box } from "@mui/material";
import StyledHeader from "../components/StyledHeader";
import JobCard from "../components/JobCard";

const examples = Array.from({ length: 10 }, (_, i) => ({
  title: `Programista ${i + 1}`,
  description: "Description",
  location: "Katowice",
}));

const SearchPage: React.FC = () => {
  return (
    <>
      <StyledHeader />
      <Box
        sx={{
          marginLeft: "5vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // Centers vertically
          minHeight: "90vh", // Takes minimum 90% of the viewport height
        }}
      >
        <Grid container spacing={2}>
          {examples.map((offer, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <JobCard offer={offer} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default SearchPage;

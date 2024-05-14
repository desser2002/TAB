// SearchPage.tsx
import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import StyledHeader from "../components/StyledHeader";
import JobCard from "../components/JobCard";
import { getJobOffer, JobOffer } from "../utils/getJobOffers";

const SearchPage: React.FC = () => {
  // Define the state with the type expected to be an array of JobOffer
  const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);

  // Fetch job offers when component mounts
  useEffect(() => {
    const fetchJobOffers = async () => {
      try {
        const offers = await getJobOffer(); // Call your async function
        setJobOffers(offers); // Store the fetched offers in state
      } catch (error) {
        console.error("Failed to fetch job offers:", error);
        // Optionally handle errors, e.g., show an error message in UI
      }
    };

    fetchJobOffers();
  }, []); // Empty dependency array to only run once on mount

  return (
    <>
      <StyledHeader />
      <Box
        sx={{
          marginLeft: "5vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "90vh",
        }}
      >
        <Grid container spacing={2}>
          {jobOffers.map((offer, index) => (
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

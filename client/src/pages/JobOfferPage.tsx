import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StyledHeader from "../components/StyledHeader";
import { getJobOffer } from "../utils/getJobOfferDetails";
import { Typography, Box, CircularProgress } from "@mui/material";
import { JobOffer } from "../utils/getJobOffers";
import { getCompanyName } from "../utils/getCompanyName";

const JobOfferPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobOfferAndCompany = async () => {
      if (offerId) {
        try {
          setLoading(true);
          const fetchedJobOffer = await getJobOffer(offerId);
          if (fetchedJobOffer) {
            const fetchedCompanyName = await getCompanyName(
              String(fetchedJobOffer.company)
            );
            if (fetchedCompanyName) {
              setJobOffer(fetchedJobOffer);
              setCompanyName(fetchedCompanyName);
            } else {
              throw new Error("Company name could not be fetched");
            }
          } else {
            throw new Error("Job offer could not be fetched");
          }
        } catch (error) {
          console.error("Failed to fetch job offer or company name:", error);
          // Optionally update the state to reflect an error in loading data
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobOfferAndCompany();
  }, [offerId]);

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!jobOffer || !companyName) {
    // Дополнительная проверка на наличие всех данных
    return (
      <Typography variant="h5">
        Unable to load the job offer details.
      </Typography>
    );
  }

  return (
    <>
      <StyledHeader />
      <Box sx={{ marginTop: "20px", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          {jobOffer.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Location: {jobOffer.location}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {jobOffer.short_description}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {jobOffer.full_description}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          Salary: {jobOffer.salary} zl
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          Company: {companyName}
        </Typography>
      </Box>
    </>
  );
};

export default JobOfferPage;

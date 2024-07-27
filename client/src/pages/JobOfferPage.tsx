import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StyledHeader from "../components/StyledHeader";
import { getJobOffer } from "../utils/getJobOfferDetails";
import { Typography, Box, Button } from "@mui/material";
import { JobOffer } from "../utils/getJobOffers";
import { getCompanyName } from "../utils/getCompanyName";

const JobOfferPage: React.FC = () => {
  const { offerId } = useParams<{ offerId: string }>();
  const [jobOffer, setJobOffer] = useState<JobOffer | null>(null);
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobOfferAndCompany = async () => {
      if (offerId) {
        try {
          setLoading(true);
          const fetchedJobOffer = await getJobOffer(offerId);
          setJobOffer(fetchedJobOffer);
          console.log(fetchedJobOffer.company);
          const name = await getCompanyName(String(fetchedJobOffer.company));
          setCompanyName(name);
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
    return <Typography variant="h5">Loading...</Typography>;
  }

  const handleApply = () => {
    // Implementation for application logic goes here
    navigate(`/apply/${offerId}`);
  };

  return (
    <>
      <StyledHeader />
      <Box sx={{ marginTop: "300px", padding: "20px" }}>
        {jobOffer && (
          <>
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
            <Button variant="contained" color="primary" onClick={handleApply}>
              Apply
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default JobOfferPage;

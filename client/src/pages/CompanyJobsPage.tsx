import { FC, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Grid,
  CircularProgress,
  Container,
  Button,
  Typography,
} from "@mui/material";
// Import the JobCard component
import { fetchJobsByCompanyId } from "../utils/getJobsbyCompanyId";
import JobCardCompanies from "../components/JobCardCompanie";

const CompanyJobsPage: FC = () => {
  const { companyId } = useParams<{ companyId: string }>(); // Получаем companyId из URL
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        if (companyId) {
          const jobsData = await fetchJobsByCompanyId(companyId);
          setJobs(jobsData);
        }
      } catch (error) {
        console.error("Failed to load jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, [companyId]);

  return (
    <>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
          Your offers
        </Typography>
        {/* Add "Create New Job" Button */}
        <Box sx={{ marginBottom: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/create-job-offer/${companyId}`} // Link to the job creation page for this company
            sx={{ textDecoration: "none", color: "white" }}
          >
            Create New Job
          </Button>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start", // Выровняем первый элемент по левому верхнему углу
              minHeight: "90vh",
            }}
          >
            <Grid container spacing={2} alignItems="flex-start">
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <JobCardCompanies
                      offer={{
                        _id: job._id,
                        title: job.title,
                        short_description: job.short_description,
                        location: job.location,
                        salary: job.salary,
                        publication_date: job.publication_date,
                      }}
                    />
                  </Grid>
                ))
              ) : (
                <Typography>No jobs found for this company.</Typography>
              )}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default CompanyJobsPage;

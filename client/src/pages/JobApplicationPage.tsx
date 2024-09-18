import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getApplicationsByJobId } from "../utils/getApplys";
import { ApplyT } from "../types/Apply";
import ApplicationCard from "../components/Apply_card";

const JobApplicationsPage: React.FC = () => {
  const { offerid } = useParams<{ offerid: string }>(); // Получаем offerid из URL параметров
  const [applications, setApplications] = useState<ApplyT[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log(offerid);
        if (offerid) {
          const data = await getApplicationsByJobId(offerid);
          setApplications(data);
        }
      } catch (error) {
        console.error("Ошибка при получении заявок:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [offerid]);

  return (
    <Box sx={{ padding: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : applications.length > 0 ? (
        <Grid container spacing={2}>
          {applications.map((app) => (
            <Grid item xs={12} sm={6} md={4} key={app._id}>
              <ApplicationCard
                email={app.email}
                resumeUrl={app.cv_url} // Предполагается, что app.cv_url содержит ссылку на резюме
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>Заявки на эту вакансию не найдены.</Typography>
      )}
    </Box>
  );
};

export default JobApplicationsPage;

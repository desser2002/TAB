import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Offer {
  _id: string;
  title: string;
  short_description: string;
  location: string;
  salary: number;
  publication_date: Date;
}

interface JobCardProps {
  offer: Offer;
}

const JobCardCompanies: React.FC<JobCardProps> = ({ offer }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleApplyClick = () => {
    navigate(`/job-apply/${offer._id}`); // Navigates to the detailed offer page
  };
  return (
    <Card sx={{ maxWidth: "30vw", marginBottom: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {offer.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {offer.short_description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Location: {offer.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleApplyClick}>
          View Applications
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCardCompanies;

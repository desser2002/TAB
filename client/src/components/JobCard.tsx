import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

interface Offer {
  title: string;
  short_description: string;
  location: string;
  salary: number;
  publication_date: Date;
}

interface JobCardProps {
  offer: Offer;
}

const JobCard: React.FC<JobCardProps> = ({ offer }) => {
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
        <Button size="small">Apply Now</Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;

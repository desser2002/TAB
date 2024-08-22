import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Box, TextField, Button } from "@mui/material";
import StyledHeader from "../components/StyledHeader";
import { Company } from "../types/Company";
import { getCompanyInfo } from "../utils/getCompanyInfo";
import { addUsertoAdmins } from "../utils/addUserToAdmins";

const CompanyDetailsPage: FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCompany = async () => {
      if (companyId) {
        try {
          const companyData = await getCompanyInfo(companyId);
          setCompany(companyData);
        } catch (error) {
          console.error("Failed to load company:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCompany();
  }, [companyId]);

  const handleAddAdmin = async () => {
    if (companyId) {
      try {
        await addUsertoAdmins(companyId, userId);
        alert("Admin added successfully!");
      } catch (error) {
        console.error("Failed to add admin:", error);
      }
    }
  };

  return (
    <div>
      <StyledHeader />
      <Container
        maxWidth="md"
        sx={{
          marginTop: 16, // Add top margin to prevent overlap
        }}
      >
        {loading ? (
          <Typography>Loading...</Typography>
        ) : company ? (
          <Box>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              {company.name}
            </Typography>
            <Typography variant="body1">
              Location: {company.location}
            </Typography>
            <Typography variant="body1">
              Industry: {company.industry}
            </Typography>
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6">Add Admin</Typography>
              <TextField
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Button variant="contained" onClick={handleAddAdmin}>
                Add Admin
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>Company not found.</Typography>
        )}
      </Container>
    </div>
  );
};

export default CompanyDetailsPage;

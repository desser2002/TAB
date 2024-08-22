import { FC, useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Container,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import StyledHeader from "../components/StyledHeader";
import { fetchCompaniesByUserId } from "../utils/getUserCompanies";
import { Company } from "../types/Company";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";

const MyCompaniesPage: FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCompanies = async () => {
      const sessionId = localStorage.getItem("sessionID");
      if (sessionId) {
        const fetchedUserId = await fetchUserIdBySessionId(sessionId);
        try {
          const companyData = await fetchCompaniesByUserId(fetchedUserId);
          setCompanies(companyData);
        } catch (error) {
          console.error("Failed to load companies:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadCompanies();
  }, []);

  return (
    <div>
      <StyledHeader />
      <Container
        maxWidth="md"
        sx={{
          marginTop: 16, // Add top margin to prevent overlap
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 4 }}>
          My Companies
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {companies.length > 0 ? (
              companies.map((company) => (
                <Card key={company.id} variant="outlined">
                  <Link
                    to={`/company/${company.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <CardContent>
                      <Typography variant="h6">{company.name}</Typography>
                      <Typography variant="body2">
                        Location: {company.location}
                      </Typography>
                      <Typography variant="body2">
                        Industry: {company.industry}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              ))
            ) : (
              <Typography>No companies found.</Typography>
            )}
          </Box>
        )}
      </Container>
    </div>
  );
};

export default MyCompaniesPage;

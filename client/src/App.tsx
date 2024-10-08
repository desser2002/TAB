import React from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateJobOffer from "./pages/CreateJobOffer";
import SearchPage from "./pages/SearchPage";
import JobOfferPage from "./pages/JobOfferPage";
import ApplyPage from "./pages/ApplyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthGuard from "./components/AuthGuard";
import PersonalPage from "./pages/PersonalPage";
import AppAdminPage from "./pages/AppAdminPage";
import AddUniversityPage from "./pages/AddUniversityPage";
import CreateCompanyForm from "./pages/CreateCompany";
import MyCompaniesPage from "./pages/MyCompanies";
import CompanyDetailsPage from "./pages/CompanyDetailsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <AuthGuard>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/create-job-offer" element={<CreateJobOffer />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/offer/:offerId" element={<JobOfferPage />} />
                <Route path="/apply/:offerId" element={<ApplyPage />} />
                <Route path="/profile/:userid" element={<PersonalPage />} />
                <Route path="/admin" element={<AppAdminPage />} />
                <Route path="/create-company" element={<CreateCompanyForm />} />
                <Route path="/my-company" element={<MyCompaniesPage />} />
                <Route
                  path="/admin/instituion"
                  element={<AddUniversityPage />}
                />
                <Route
                  path="/company/:companyId"
                  element={<CompanyDetailsPage />}
                />
              </Routes>
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

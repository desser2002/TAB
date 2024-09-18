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
import CompanyPage from "./pages/CompanyPage";
import ViewApplys from "./pages/ViewApplys";
import CompanyJobsPage from "./pages/CompanyJobsPage";
import JobApplicationsPage from "./pages/JobApplicationPage";
import AddExperiencePage from "./pages/AddExperiencePage"; // Импортируем страницу добавления опыта

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <AuthGuard>
              <MainPage />
            </AuthGuard>
          }
        />
        <Route
          path="/create-job-offer/:companyId"
          element={
            <AuthGuard>
              <CreateJobOffer />
            </AuthGuard>
          }
        />
        <Route
          path="/search"
          element={
            <AuthGuard>
              <SearchPage />
            </AuthGuard>
          }
        />
        <Route
          path="/offer/:offerId"
          element={
            <AuthGuard>
              <JobOfferPage />
            </AuthGuard>
          }
        />
        <Route
          path="/apply/:offerId"
          element={
            <AuthGuard>
              <ApplyPage />
            </AuthGuard>
          }
        />
        <Route
          path="/profile/:userid"
          element={
            <AuthGuard>
              <PersonalPage />
            </AuthGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <AuthGuard>
              <AppAdminPage />
            </AuthGuard>
          }
        />
        <Route
          path="/create-company"
          element={
            <AuthGuard>
              <CreateCompanyForm />
            </AuthGuard>
          }
        />
        <Route
          path="/my-company"
          element={
            <AuthGuard>
              <MyCompaniesPage />
            </AuthGuard>
          }
        />
        <Route
          path="/view-applys"
          element={
            <AuthGuard>
              <ViewApplys />
            </AuthGuard>
          }
        />
        <Route
          path="/company-admin/:companyId"
          element={
            <AuthGuard>
              <CompanyPage />
            </AuthGuard>
          }
        />
        <Route
          path="/admin/instituion"
          element={
            <AuthGuard>
              <AddUniversityPage />
            </AuthGuard>
          }
        />
        <Route
          path="/job-apply/:offerid"
          element={
            <AuthGuard>
              <JobApplicationsPage />
            </AuthGuard>
          }
        />
        <Route
          path="/user-management/:companyId"
          element={
            <AuthGuard>
              <CompanyDetailsPage />
            </AuthGuard>
          }
        />
        <Route
          path="/company-jobs/:companyId"
          element={
            <AuthGuard>
              <CompanyJobsPage />
            </AuthGuard>
          }
        />
        {/* Добавляем новый маршрут для страницы добавления опыта */}
        <Route
          path="/add-experience"
          element={
            <AuthGuard>
              <AddExperiencePage />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

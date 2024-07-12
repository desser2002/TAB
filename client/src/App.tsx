import React from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Исправленный импорт
import CreateJobOffer from "./pages/CreateJobOffer"; // Исправленный импорт
import SearchPage from "./pages/SearchPage";
import JobOfferPage from "./pages/JobOfferPage";
import ApplyPage from "./pages/ApplyPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Исправленные Route компоненты */}
        <Route path="/" Component={MainPage} />
        <Route path="/create-job-offer" Component={CreateJobOffer} />
        <Route path="/search" Component={SearchPage} />
        <Route path="/offer/:offerId" element={<JobOfferPage />} />
        <Route path="/apply/:offerId" element={<ApplyPage />} /> // New route
        for applying
        <Route path="/login" element={<LoginPage />} /> //
      </Routes>
    </Router>
  );
};

export default App;

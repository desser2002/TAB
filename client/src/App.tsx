import React from "react";
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Исправленный импорт
import CreateJobOffer from "./pages/CreateJobOffer"; // Исправленный импорт
import SearchPage from "./pages/SearchPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Исправленные Route компоненты */}
        <Route path="/" Component={MainPage} />
        <Route path="/create-job-offer" Component={CreateJobOffer} />
        <Route path="/search" Component={SearchPage} />
      </Routes>
    </Router>
  );
};

export default App;

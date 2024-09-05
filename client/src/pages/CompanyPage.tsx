import React, { useState } from "react";
import { Box } from "@mui/material";

import SidebarMenu from "../components/LeftMenu";

const CompanyPage: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Функция для управления состоянием меню
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Используем SidebarMenu */}
      <SidebarMenu isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />

      {/* Основной контент */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isDrawerOpen ? "240px" : "0",
          transition: "margin-left 0.3s",
        }}
      ></Box>
    </Box>
  );
};

export default CompanyPage;

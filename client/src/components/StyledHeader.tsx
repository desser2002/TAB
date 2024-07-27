import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Header from "./Header";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";

const StyledHeader: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Используем хук useNavigate

  useEffect(() => {
    const initUserData = async () => {
      const sessionId = localStorage.getItem("sessionID");
      if (sessionId) {
        const fetchedUserId = await fetchUserIdBySessionId(sessionId);
        setUserId(fetchedUserId);
      }
    };

    initUserData();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logout functionality here");
    localStorage.removeItem("sessionID"); // Очищаем sessionID при выходе
    setUserId(null); // Очищаем userId
    handleClose();
    navigate("/login"); // Перенаправляем на страницу логина
  };
  const handleMyProfile = () => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Header>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <IconButton aria-label="account" color="primary" onClick={handleMenu}>
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
          <MenuItem onClick={handleClose}>
            {userId ? `User ID: ${userId}` : "Not logged in"}
          </MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <IconButton aria-label="home" color="primary">
            <HomeIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/create-job-offer">
          <IconButton aria-label="add" color="primary">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </Link>
        <Link to="/search">
          <IconButton aria-label="search" color="primary">
            <SearchIcon fontSize="large" />
          </IconButton>
        </Link>
      </div>
    </Header>
  );
};

export default StyledHeader;

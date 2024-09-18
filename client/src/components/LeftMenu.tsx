import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useParams, Link } from "react-router-dom";
import { getCompanyName } from "../utils/getCompanyName"; // Import the function to fetch company name

// Define SidebarMenuProps interface
interface SidebarMenuProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, toggleDrawer }) => {
  const { companyId } = useParams<{ companyId: string }>(); // Extract companyId from URL
  const drawerWidth = 240;

  const [companyName, setCompanyName] = useState<string>("");

  // Fetch company name when component mounts
  useEffect(() => {
    const fetchCompanyName = async () => {
      if (companyId) {
        try {
          const name = await getCompanyName(companyId);
          setCompanyName(name);
        } catch (error) {
          console.error("Failed to fetch company name:", error);
        }
      }
    };

    fetchCompanyName();
  }, [companyId]);

  return (
    <Box>
      {/* Кнопка для сворачивания/разворачивания меню */}
      <IconButton
        onClick={toggleDrawer}
        sx={{ position: "absolute", top: 16, left: 16 }}
      >
        <MenuIcon /> {/* Add MenuIcon to make the button visible */}
      </IconButton>

      {/* Выдвигающееся меню */}
      <Drawer
        anchor="left"
        variant="temporary"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <List>
            {/* Ссылки на разделы */}
            <ListItem
              button
              component={Link}
              to={`/user-management/${companyId}`} // Dynamically pass companyId here
              onClick={toggleDrawer}
            >
              <ListItemText primary="User management" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={`/company-jobs/${companyId}`} // Dynamically pass companyId here
              onClick={toggleDrawer}
            >
              <ListItemText primary="Jobs offers" />
            </ListItem>

            {/* Display the company name in the menu with 95% margin-top */}
            <ListItem
              sx={{
                marginTop: "83vh", // Offset of 95% of the viewport height
              }}
            >
              <ListItemText
                primary={companyName ? companyName : "Loading..."}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default SidebarMenu;

import { FC } from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppAdminPage: FC = () => {
  const navigate = useNavigate();
  const sessionID = localStorage.getItem("sessionID");
  console.log(sessionID);
  const handleIstitclick = () => {
    navigate(`/admin/instituion`);
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleIstitclick}>
        Add intitution
      </Button>
    </div>
  );
};

export default AppAdminPage;

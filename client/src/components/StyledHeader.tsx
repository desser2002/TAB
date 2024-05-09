import { FC } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import Header from "./Header";

interface Props {
  showAddButton?: boolean;
}

const StyledHeader: FC<Props> = () => {
  return (
    <div>
      <Header>
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
      </Header>
    </div>
  );
};

export default StyledHeader;

import { FC } from "react";
import StyledHeader from "../components/StyledHeader";

const MainPage: FC = () => {
  const sessionID = localStorage.getItem("sessionID");
  console.log(sessionID);
  return (
    <div>
      <StyledHeader></StyledHeader>
    </div>
  );
};

export default MainPage;

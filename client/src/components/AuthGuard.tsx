import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionID");
    if (!sessionId) {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthGuard;

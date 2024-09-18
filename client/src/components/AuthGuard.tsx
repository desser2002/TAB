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

  // Если sessionID существует, рендерим дочерние компоненты, иначе возвращаем null
  const sessionId = localStorage.getItem("sessionID");
  return sessionId ? <>{children}</> : null;
};

export default AuthGuard;

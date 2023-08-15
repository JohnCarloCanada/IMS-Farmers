import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/Login");
    }
  }, [isLogin]);
  return <Outlet />;
};

export default ProtectedRoute;

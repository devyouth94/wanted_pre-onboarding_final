import React from "react";
import { Navigate } from "react-router-dom";
import { userStorage } from "utils/userStorage";
import { PATH } from "./path";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!userStorage.getToken()) {
    return <Navigate to={PATH.LOGIN} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

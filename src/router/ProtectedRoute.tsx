import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/jwtDecodeExpTime";
import { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("AccessToken");

  if (!isTokenValid(token)) {
    alert("Phiên đăng nhập đã hết hạn!");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/jwtDecodeExpTime";
import { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("AccessToken");

  if (isTokenValid(token)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;

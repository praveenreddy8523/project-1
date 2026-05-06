import { Navigate, Outlet } from "react-router-dom";
import { Routes, Route } from "react-router-dom";


const ProtectedRoute = ({ children }) => {

  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
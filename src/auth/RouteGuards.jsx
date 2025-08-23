import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const RequireAuth = ({ children }) => {
   const isAuthenticated = localStorage.getItem("isAuthenticated");
   const location = useLocation();

   if (!isAuthenticated) {
      toast.error("Please login to access this page");
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return children;
};

export const RedirectIfAuthenticated = ({ children }) => {
   const isAuthenticated = localStorage.getItem("isAuthenticated");
   const location = useLocation();

   if (isAuthenticated) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
   }

   return children;
};

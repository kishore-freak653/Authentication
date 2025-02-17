import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utils/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
   
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;

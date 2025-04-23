import { Navigate } from "react-router-dom";
import { profileStore } from "../store/profileStore";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user } = profileStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  // If no roles specified, allow all logged-in users
  if (allowedRoles.length === 0) {
    return children;
  }

  const hasRole = user.roles?.some((role) => allowedRoles.includes(role));

  return hasRole ? children : <Navigate to="/" />;
};

export default PrivateRoute;

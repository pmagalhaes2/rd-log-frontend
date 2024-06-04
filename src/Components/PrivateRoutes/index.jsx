import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export const PrivateRoutes = () => {
  const { user } = useUser();
  return user.id ? <Outlet /> : <Navigate to="/login" />;
};

import { ReactNode } from "react";
import { Navigate } from "react-router";
import { useGetQuery } from "../../../hooks/useApiRequest";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  interface ProfileData {
    status: number;
  }

  const { data } = useGetQuery<ProfileData>("/profile", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  if (data?.status === 108) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

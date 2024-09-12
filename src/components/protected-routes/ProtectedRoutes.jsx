import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ auth }) {
  return auth != null ? <Outlet /> : <Navigate to="/" />;
}

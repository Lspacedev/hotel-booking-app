import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ auth }) {
  return auth.currentUser != null ? <Outlet /> : <Navigate to="/" />;
}

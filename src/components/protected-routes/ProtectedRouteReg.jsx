import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteReg({ auth }) {
  return auth.currentUser != null ? <Navigate to="/home" /> : <Outlet />;
}

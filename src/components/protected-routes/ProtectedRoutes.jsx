import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes({ auth }) {
  const uid = localStorage.getItem("uid");

  return uid !== null && uid !== "" ? <Outlet /> : <Navigate to="/" />;
}

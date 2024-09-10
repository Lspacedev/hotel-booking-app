import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";
import Reservations from "./Reservations";
import ReservationViewCard from "./ReservationViewCard";
import Accomodations from "./Accomodations";
import AccomodationDetails from "./AccomodationDetails";
import AdminProfile from "../profiles/AdminProfile";

function AdminDashboard() {
  return (
    <div className="AdminDashboard">
      <Sidebar>
        <div>Accomodations</div>
        <div>Reservations</div>
        <div className="logout">Logout</div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        {/* <Reservations /> */}
        {/* <ReservationViewCard /> */}
        {/* <Accomodations /> */}
        {/* <AccomodationDetails acc={{ edit: false }} /> */}
        <AdminProfile />
      </div>
    </div>
  );
}

export default AdminDashboard;

import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";
import Bookings from "./Bookings";
import Pending from "./Pending";
import Reviews from "./Reviews";
import Favourites from "./Favourites";
import History from "./History";
import UserProfile from "../profiles/UserProfile";
function UserDashboard() {
  return (
    <div className="UserDashboard">
      <Sidebar>
        <div>Bookings</div>
        <div>Reservations</div>
        <div>Reviews</div>
        <div>Favourites</div>
        <div>History</div>
        <div className="logout">Logout</div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        {/* <Bookings /> */}
        {/* <Pending /> */}
        {/* <Reviews /> */}
        {/* <Favourites /> */}
        {/* <History /> */}
        {/* <UserProfile /> */}
      </div>
    </div>
  );
}

export default UserDashboard;

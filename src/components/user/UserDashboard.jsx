import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";
import { Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
function UserDashboard() {
  const navigation = useNavigate();
  function logOut() {
    signOut(auth)
      .then(() => {
        navigation("/");
        navigation(0);
      })
      .catch((err) => {});
  }

  function navigateBookings() {
    navigation("/home/bookings");
  }
  function navigateReviews() {
    navigation("/home/reviews");
  }
  function navigateFavourites() {
    navigation("/home/favourites");
  }
  return (
    <div className="UserDashboard">
      <Sidebar>
        <div onClick={navigateBookings}>Bookings</div>

        <div onClick={navigateReviews}>Reviews</div>

        <div onClick={navigateFavourites}>Favourites</div>

        <div className="logout" onClick={logOut}>
          Logout
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <Outlet />
      </div>
    </div>
  );
}

export default UserDashboard;

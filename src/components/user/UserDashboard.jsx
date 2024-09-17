import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";
import Bookings from "./Bookings";
import Pending from "./Pending";
import Reviews from "./Reviews";
import Favourites from "./Favourites";
import History from "./History";
import UserProfile from "../profiles/UserProfile";
import { Link, Outlet } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
function UserDashboard() {
  const navigation = useNavigate();
  function logOut() {
    signOut(auth)
      .then(() => {
        navigation("/");
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

        {/* <div>Reservations</div> */}

        <div onClick={navigateReviews}>Reviews</div>

        <div onClick={navigateFavourites}>Favourites</div>

        {/* <div>History</div> */}
        <div className="logout" onClick={logOut}>
          Logout
        </div>
      </Sidebar>
      <div className="Main">
        <DashboardNav />
        <Outlet />
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

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
  return (
    <div className="UserDashboard">
      <Sidebar>
        <Link to="bookings">
          <div>Bookings</div>{" "}
        </Link>
        {/* <div>Reservations</div> */}
        <Link to="reviews">
          <div>Reviews</div>
        </Link>
        <Link to="favourites">
          <div>Favourites</div>
        </Link>
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

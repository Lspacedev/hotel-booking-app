import Sidebar from "../dashboard/Sidebar";
import DashboardNav from "../dashboard/DashboardNav";
import { Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { MdOutlineReceiptLong } from "react-icons/md";
import { TiDocumentText } from "react-icons/ti";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineFavoriteBorder } from "react-icons/md";
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
        <div className="link" onClick={navigateBookings}>
          <MdOutlineReceiptLong className="icon" />
          <div className="text">Bookings</div>
        </div>

        <div className="link" onClick={navigateReviews}>
          <TiDocumentText className="icon" />
          <div className="text">Reviews</div>
        </div>

        <div className="link" onClick={navigateFavourites}>
          <MdOutlineFavoriteBorder className="icon" />
          <div className="text">Favourites</div>
        </div>

        <div className="logout link" onClick={logOut}>
          <FiLogOut className="icon" />
          <div className="text">Logout</div>
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

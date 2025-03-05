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
import { useState } from "react";
function UserDashboard() {
  const [currentTab, setCurrentTab] = useState("");
  const navigation = useNavigate();
  function logOut() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("uid");
        navigation("/");
      })
      .catch((err) => {});
  }

  function navigateBookings() {
    setCurrentTab("Bookings");
    navigation("/home/bookings");
  }
  function navigateReviews() {
    setCurrentTab("Reviews");
    navigation("/home/reviews");
  }
  function navigateFavourites() {
    setCurrentTab("Favourites");
    navigation("/home/favourites");
  }
  return (
    <div className="UserDashboard">
      <Sidebar>
        <div
          className={currentTab === "Bookings" ? "link currentTab" : "link"}
          onClick={navigateBookings}
        >
          <MdOutlineReceiptLong className="icon" />
          <div className="text">Bookings</div>
        </div>

        <div
          className={currentTab === "Reviews" ? "link currentTab" : "link"}
          onClick={navigateReviews}
        >
          <TiDocumentText className="icon" />
          <div className="text">Reviews</div>
        </div>

        <div
          className={currentTab === "Favourites" ? "link currentTab" : "link"}
          onClick={navigateFavourites}
        >
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

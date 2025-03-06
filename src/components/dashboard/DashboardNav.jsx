import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoCompassOutline } from "react-icons/io5";

function DashboardNav() {
  const [profilePic, setProfilePic] = useState("");
  const userId = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);

  const [user] = users.filter((user) => user.id == userId);
  const storage = getStorage();

  const navigation = useNavigate();
  function navigateDiscover() {
    navigation("/");
  }
  function navigateProfile() {
    navigation("/home/profile");
  }

  return (
    <div className="DashboardNav">
      <div className="discover" onClick={navigateDiscover}>
        <IoCompassOutline className="icon" />
        <div>Discover</div>
      </div>
      <div className="dropdown">
        <div className="dropbtn">
          <IoIosNotificationsOutline className="icon" />
          <span>{user && user.notifications.length}</span>
        </div>
        <div className="notification-content">
          <ul>
            {user && user.notifications.length > 0 ? (
              user.notifications.map((notification, i) => (
                <li key={i}>{notification.message}</li>
              ))
            ) : (
              <div>No notifications</div>
            )}
          </ul>
        </div>
      </div>
      <div className="profile" onClick={navigateProfile}>
        <div className="profile-icon" onClick={navigateProfile}>
          {
            <img
              src={
                user && user.profilePic
                  ? user.profilePic
                  : "/images/profile.png"
              }
            />
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;

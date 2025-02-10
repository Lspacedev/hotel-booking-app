import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { FaHotel } from "react-icons/fa";
import { IoCompassOutline } from "react-icons/io5";

function Nav() {
  const [profilePic, setProfilePic] = useState("");
  const userId = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);

  const [user] = users.filter((user) => user.id == userId);

  const navigation = useNavigate();
  function navigateLogin() {
    navigation("/login");
  }
  function navigateRegister() {
    navigation("/registration");
  }
  function navigateProfile() {
    navigation("/home/profile");
  }
  return (
    <div className="Nav">
      <div className="logo-container" onClick={() => navigation("/")}>
        <FaHotel className="icon" />
        <h3 className="logo">ZaHotels.com</h3>
      </div>
      <div className="nav-links">
        <div className="discover" onClick={() => navigation("/")}>
          <IoCompassOutline className="icon" />
          <div>Discover</div>
        </div>
        {userId === "" ? (
          <div className="auth-btn">
            <button className="login-btn" onClick={navigateLogin}>
              Login
            </button>

            <button className="register-btn" onClick={navigateRegister}>
              Register
            </button>
          </div>
        ) : (
          <div className="profile-icon" onClick={navigateProfile}>
            {user && (
              <img
                src={
                  user.profilePic !== ""
                    ? user.profilePic
                    : "/images/profile.png"
                }
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Nav;

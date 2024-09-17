import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DashboardNav() {
  const navigation = useNavigate();
  function navigateDiscover() {
    navigation("/");
  }
  function navigateProfile() {
    navigation("/home/profile");
  }
  return (
    <div className="DashboardNav">
      <p onClick={navigateDiscover}>Discover</p>
      <div className="profile" onClick={navigateProfile}>
        Profile
      </div>
    </div>
  );
}

export default DashboardNav;

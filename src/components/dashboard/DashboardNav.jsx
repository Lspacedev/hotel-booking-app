import { Link } from "react-router-dom";
function DashboardNav() {
  return (
    <div className="DashboardNav">
      <Link to="/">
        <p>Discover</p>
      </Link>
      <div className="profile">profile</div>
    </div>
  );
}

export default DashboardNav;

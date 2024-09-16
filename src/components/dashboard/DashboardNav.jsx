import { Link } from "react-router-dom";
function DashboardNav() {
  return (
    <div className="DashboardNav">
      <Link to="/">
        <p>Discover</p>
      </Link>
      <Link to="/home/profile">
        <div className="profile">profile</div>{" "}
      </Link>
    </div>
  );
}

export default DashboardNav;

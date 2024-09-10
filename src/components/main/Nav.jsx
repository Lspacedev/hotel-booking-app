import { Link } from "react-router-dom";
function Nav() {
  return (
    <div className="Nav">
      <div className="logo">ZaHotels.com</div>
      <div className="nav-links">
        <div>Discover</div>
        <Link to="login">
          <div>Login</div>
        </Link>
        <Link to="registration">
          <button className="register-btn">Register</button>
        </Link>
      </div>
    </div>
  );
}
export default Nav;

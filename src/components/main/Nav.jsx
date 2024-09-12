import { Link, useNavigate } from "react-router-dom";
function Nav() {
  const navigation = useNavigate();
  function navigateLogin() {
    navigation("/login");
  }
  function navigateRegister() {
    navigation("/registration");
  }
  return (
    <div className="Nav">
      <div className="logo">ZaHotels.com</div>
      <div className="nav-links">
        <div>Discover</div>
        <div onClick={navigateLogin}>Login</div>

        <button className="register-btn" onClick={navigateRegister}>
          Register
        </button>
      </div>
    </div>
  );
}
export default Nav;

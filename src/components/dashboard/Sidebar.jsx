import { Children } from "react";
import { FaHotel } from "react-icons/fa";
function Sidebar({ children }) {
  return (
    <div className="Sidebar">
      <div className="logo-container">
        <img src="/images/logo-icon2.png" className="logo-icon-img" />
        <img src="/images/logo-text.png" className="logo-text-img" />
      </div>
      <div className="sidebar-links">{children}</div>
    </div>
  );
}

export default Sidebar;

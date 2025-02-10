import { Children } from "react";
import { FaHotel } from "react-icons/fa";
function Sidebar({ children }) {
  return (
    <div className="Sidebar">
      <div className="logo-container">
        <FaHotel className="icon" />
        <h3 className="logo">ZaHotels.com</h3>
      </div>
      <div className="sidebar-links">{children}</div>
    </div>
  );
}

export default Sidebar;

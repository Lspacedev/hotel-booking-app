import { ImPriceTag } from "react-icons/im";
import { useNavigate, useLocation } from "react-router-dom";

function SaveCard({ text }) {
  const navigation = useNavigate();

  return (
    <div className="SaveCard">
      <div className="save-card-container">
        <ImPriceTag className="save-card-icon" />
        <div className="save-card-text">{text}</div>
        <button
          className="save-card-sign-in"
          onClick={() => navigation("/login")}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
export default SaveCard;

import { GiCheckMark } from "react-icons/gi";
import { useNavigate, useLocation } from "react-router-dom";

function Avertisment() {
  const navigation = useNavigate();

  return (
    <div className="Avertisment">
      <div className="backdrop">
        <div className="avert-deco"></div>
        <div className="text-section">
          <div className="avert-stats">
            <div className="avert-stat">
              <GiCheckMark />
              <div>Simple</div>
            </div>
            <div className="avert-stat">
              <GiCheckMark />
              <div>Affordable</div>
            </div>
            <div className="avert-stat">
              <GiCheckMark />
              <div>Trusted</div>
            </div>
          </div>
          <div>Planning your next stay has never been simpler!</div>
          <button
            className="avert-reg-btn"
            onClick={() => navigation("/registration")}
          >
            Register Now
          </button>
        </div>
        <div className="image-container">
          <img src="/images/capetownbeach.jpg" />
        </div>
      </div>
    </div>
  );
}
export default Avertisment;

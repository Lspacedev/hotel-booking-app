import { GiCheckMark } from "react-icons/gi";

function Avertisment() {
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
          <button className="avert-reg-btn">Register Now</button>
        </div>
        <div className="image-container">
          <img src="/images/capetownbeach.jpg" />
        </div>
      </div>
    </div>
  );
}
export default Avertisment;

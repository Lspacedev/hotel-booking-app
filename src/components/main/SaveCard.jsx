import { ImPriceTag } from "react-icons/im";

function SaveCard({ text }) {
  return (
    <div className="SaveCard">
      <div className="save-card-container">
        <ImPriceTag className="save-card-icon" />
        <div className="save-card-text">{text}</div>
        <button className="save-card-sign-in">Sign In</button>
      </div>
    </div>
  );
}
export default SaveCard;

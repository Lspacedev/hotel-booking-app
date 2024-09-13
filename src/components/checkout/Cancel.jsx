import { useNavigate } from "react-router-dom";

function Cancel() {
  const navigation = useNavigate();
  function navigateHome() {
    navigation("/");
  }
  return (
    <div className="Cancel">
      <div>Payment cancelled</div>
      <div onClick={navigateHome}>Go back to Zahotels.com</div>
    </div>
  );
}

export default Cancel;

import { useNavigate } from "react-router-dom";

function Success() {
  const navigation = useNavigate();
  function navigateHome() {
    navigation("/");
  }
  return (
    <div className="Success">
      <div>
        Payment successful
        <div onClick={navigateHome}>Go back to Zahotels.com</div>
      </div>
    </div>
  );
}

export default Success;

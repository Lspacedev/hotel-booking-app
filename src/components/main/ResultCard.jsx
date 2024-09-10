import { useNavigate } from "react-router-dom";

function ResultCard({ result }) {
  const navigation = useNavigate();

  function handleNavigateSubPage() {
    navigation(`/results/${result.id}`);
  }
  return (
    <div className="ResultCard" onClick={handleNavigateSubPage}>
      {JSON.stringify(result)}
      {/* <div className="img"></div>
      <div className="result-card-info">
        <div className="side-one">
          <h4>Room Name</h4>
          <h6>Location</h6>
          <p>Rating</p>
          <p>Description</p>
        </div>
        <div className="side-two">
          <p>Price</p>
          <button className="like-btn">Like</button>
        </div>
      </div> */}
    </div>
  );
}
export default ResultCard;

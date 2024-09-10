import ReviewForm from "./ReviewForm";
import { useState } from "react";

function AddReview() {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }

  return (
    <div className="AddReview">
      <div className="Add-div">
        {clicked && <ReviewForm toggleClicked={toggleClicked} />}

        <button onClick={toggleClicked}>New Review</button>
      </div>
    </div>
  );
}

export default AddReview;

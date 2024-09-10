import AccomodationForm from "./AccomodationForm";
import { useState } from "react";

function AddAccomodation() {
  const [clicked, setClicked] = useState(false);

  function toggleClicked() {
    setClicked(!clicked);
  }

  return (
    <div className="AddAccomodation">
      <div className="Add-div">
        {clicked && <AccomodationForm toggleClicked={toggleClicked} />}

        <button onClick={toggleClicked}>New Accomodation</button>
      </div>
    </div>
  );
}

export default AddAccomodation;

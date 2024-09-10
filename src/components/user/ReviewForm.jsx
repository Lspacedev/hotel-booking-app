import { useState } from "react";

function ReviewForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    roomName: "",
    rating: "",
    reviewText: "",
    date:
      new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    //add review to firestore
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="ReviewForm">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter Review Information</h3>
          <div className="form-close" onClick={handleFormClose}>
            x
          </div>
        </div>
        <form>
          <div className="roomName">
            <label htmlFor="roomName">
              Room Name
              <select>
                <option>Room 1</option>
              </select>
            </label>
          </div>

          <div className="rating">
            <label htmlFor="rating">
              Rating
              <input
                type="number"
                id="rating"
                name="rating"
                onChange={(e) => handleChange(e)}
                value={obj.rating}
              />
            </label>
          </div>

          <div className="reviewText">
            <label htmlFor="reviewText">
              Write a short review
              <input
                id="reviewText"
                name="reviewText"
                onChange={(e) => handleChange(e)}
                value={obj.reviewText}
              />
            </label>
          </div>

          <input
            id="task-add-submit"
            type="submit"
            value="submit"
            onClick={handleSubmit}
          ></input>
        </form>
      </div>
    </div>
  );
}

export default ReviewForm;

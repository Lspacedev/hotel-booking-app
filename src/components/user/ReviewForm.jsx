import { useState } from "react";
import { useSelector } from "react-redux";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function ReviewForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    room_name: "",
    rating: "",
    reviewText: "",
    date:
      new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString(),
  });
  const navigation = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let reviewConfirmation = window.confirm(
      "You are about to add a review. Continue?"
    );
    if (reviewConfirmation) {
      //add review to firestore
      try {
        const accomodationsCollection = collection(
          db,
          "admin",
          "A2Kvj5vTHdfJde8Sl8KV8rw1e2v1",
          "accomodations"
        );
        const accomodationRef = doc(accomodationsCollection, obj.room_name);
        console.log(accomodationRef);
        await updateDoc(accomodationRef, {
          reviews: arrayUnion({ ...obj, userId: user }),
        });
        alert("added review");
        navigation(0);
      } catch (err) {
        console.log(err);
      }
      toggleClicked();
    }
  }

  function handleFormClose() {
    toggleClicked();
  }

  const user = useSelector((state) => state.user.currentUser);
  const accomodations = useSelector(
    (state) => state.accomodations.accomodations
  );
  let bookings = [];
  accomodations.forEach((accomodation) => {
    if (accomodation.bookings.length > 0) {
      accomodation.bookings.forEach((booking) => {
        if (booking.userId === user) {
          bookings.push(accomodation);
        }
      });
    }
  });

  return (
    <div className="ReviewForm">
      <div className="form-div">
        <div className="form-title-close">
          <div className="form-close" onClick={handleFormClose}>
            <CgClose />
          </div>
        </div>
        {typeof bookings !== "undefined" && bookings.length === 0 ? (
          <div className="no-bookings">
            You currently have not bookings to review.
          </div>
        ) : (
          <form>
            <div className="room_name">
              <h3>Enter Review Information</h3>

              <label htmlFor="room_name">
                Room Name
                <select
                  name="room_name"
                  onChange={(e) => handleChange(e)}
                  value={obj.room_type}
                >
                  <option></option>
                  {typeof bookings !== "undefined" &&
                    bookings.length > 0 &&
                    bookings.map((booking, i) => (
                      <option key={i} value={booking.id}>
                        {booking.room_name}
                      </option>
                    ))}
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
                  max="5"
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
        )}
      </div>
    </div>
  );
}

export default ReviewForm;

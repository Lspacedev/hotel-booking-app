import { useState } from "react";

function AccomodationForm({ toggleClicked }) {
  const [obj, setObj] = useState({
    roomName: "",
    gallery: "",
    location: "",
    price: "",
    address: "",
    rating: "",
    amenities: "",
    policies: "",
    edit: false,
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  }
  function handleImageUpload(e) {
    let input = document.getElementById("gallery");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserUpdate({
        ...userUpdate,
        profilePic: event.target.result,
      });
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    //add accomodation to firestore
    toggleClicked();
  }

  function handleFormClose() {
    toggleClicked();
  }

  return (
    <div className="AccomodationForm">
      <div className="form-div">
        <div className="form-title-close">
          <h3>Enter Accomodation Information</h3>
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
          <div className="gallery">
            <label htmlFor="gallery">
              Gallery
              <input
                type="file"
                id="gallery"
                name="gallery"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div>
          <div className="location">
            <label htmlFor="location">
              Location
              <select>
                <option>loc</option>
              </select>
            </label>
          </div>
          <div className="price">
            <label htmlFor="price">
              Price
              <input
                type="text"
                id="price"
                name="price"
                onChange={(e) => handleChange(e)}
                value={obj.price}
              />
            </label>
          </div>

          <div className="address">
            <label htmlFor="address">
              Address
              <textarea></textarea>
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

          <div className="amenities">
            <label htmlFor="amenities">
              Amenities
              <textarea></textarea>
            </label>
          </div>
          <div className="policies">
            <label htmlFor="policies">
              Policies
              <textarea></textarea>
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

export default AccomodationForm;

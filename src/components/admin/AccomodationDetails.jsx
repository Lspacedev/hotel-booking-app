import { useState } from "react";

function AccomodationDetails({ acc, photosArr, title }) {
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
    //update accomodation to firestore
    toggleClicked();
  }

  return (
    <div className="AccomodationDetails">
      <div className="accomodation-content">
        {acc.edit === true ? (
          <div className="accomodation-update-form">
            <div className="form-title-close">
              <h3>Enter Accomodation Information</h3>
              <div className="form-close">x</div>
            </div>

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
          </div>
        ) : (
          <div>
            <h3 className="acc-name">Name</h3>
            <p className="acc-address">Address</p>
            <div className="img"></div>
            <button className="share-btn">Share</button>
            <div className="accomodation-info">
              <h4>Price</h4>
              <div className="acc-info-section">
                <h5>Hotel Facilities</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
                  cum facilis fuga ipsa consectetur atque suscipit totam rem
                  aliquid quas delectus velit numquam nemo, culpa asperiores
                  perferendis, eius sint placeat?
                </p>
              </div>
              <div className="acc-info-section">
                <h5>Policies</h5>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Alias aperiam illo amet et, voluptates possimus itaque rem
                  accusamus repudiandae quas dolor vel placeat quis ducimus
                  laudantium. Modi hic ea amet?
                </p>
              </div>
              <div className="acc-details">
                <h5>Policies</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid, consectetur labore odit quos temporibus quasi
                  dignissimos placeat facere atque nam quo nulla quod, possimus
                  nesciunt aut? Aperiam soluta amet voluptatibus.
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Facere exercitationem quos repudiandae delectus eaque, autem
                  odit, qui facilis fugit odio molestiae, similique voluptatibus
                  nobis molestias perferendis magnam nihil velit ea?
                </p>
              </div>
              <div className="update-delete-btns">
                <button className="update-btn">Update</button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AccomodationDetails;

import { useEffect, useState } from "react";

function Checkout() {
  //   const [userDetails, setUserDetails] = useState({
  //     name: "",
  //     surname: "",
  //     email: "",
  //     password: "",
  //     profilePic: "",
  //   });

  function handleChange(e) {
    e.preventDefault();
    // const { name, value } = e.target;
    //((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="Checkout">
      <div className="checkout-form-container">
        <h2>ZaHotels.com</h2>
        <h3>Checkout</h3>

        <div id="error"></div>
        <form action="/" id="checkout-form">
          <div className="card-holder">
            <label htmlFor="card-holder">
              Card Holder
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                //onChange={(e) => handleChange(e)}
                // value={userDetails.name}
              />
            </label>
            <span className="error"></span>
          </div>
          <div className="Bank Name">
            <label htmlFor="bname">
              Bank Name:
              <input
                type="text"
                id="bname"
                name="bname"
                //onChange={(e) => handleChange(e)}
                //value={userDetails.surname}
              />
            </label>
            <span className="error"></span>
          </div>
          <div className="Card Info">
            <label htmlFor="card-info">
              Card Info:
              <input
                type="text"
                id="card-info"
                name="card-info"
                //onChange={(e) => handleChange(e)}
                //value={userDetails.surname}
              />
            </label>
            <span className="error"></span>
          </div>

          <div className="cvv">
            <label htmlFor="cvv">
              CVV:
              <input
                type="password"
                id="cvv"
                name="cvv"
                // onChange={(e) => handleChange(e)}
                // value={userDetails.password}
              />
            </label>
            <span className="error"></span>
          </div>

          <input
            type="submit"
            value="Make Payment"
            onClick={(e) => handleSubmit(e)}
          ></input>
        </form>
      </div>
      <div className="booking-order">
        <div>
          <h3>Booking Order</h3>
          <p>Hotel Name</p>
          <p>Room Name</p>
          <p>Date</p>
          <h4>Total Price:</h4>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

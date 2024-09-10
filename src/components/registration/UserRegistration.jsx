import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

function UserRegistration() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    profilePic: "",
  });

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }
  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setUserDetails({
        ...userDetails,
        profilePic: event.target.result,
      });
    };
  }

  function register() {
    createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    )
      .then(() => {
        alert("Registered successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="UserRegistration">
      <div className="register-img">
        {/* <img src="images/shop.jpg" alt="register" /> */}
      </div>
      <div className="register-form-container">
        <h2>Create new account</h2>
        <div className="register-to-login">
          Already have an account?
          {/* <p onClick={handleNavigateLogin}>Login</p> */}
        </div>
        <div id="error"></div>
        <div className="form" id="register-form">
          <div className="name">
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                value={userDetails.name}
              />
            </label>
            <span className="error"></span>
          </div>
          <div className="surname">
            <label htmlFor="surname">
              Surname:
              <input
                type="text"
                id="surname"
                name="surname"
                onChange={(e) => handleChange(e)}
                value={userDetails.surname}
              />
            </label>
            <span className="error"></span>
          </div>
          <div className="email">
            <label htmlFor="email">
              Email:
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={userDetails.email}
                required
              />
            </label>
            <span className="error"></span>
          </div>

          <div className="password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={userDetails.password}
              />
            </label>
            <span className="error"></span>
          </div>
          <div className="profile-pic">
            <label htmlFor="profile-pic">
              Profile picture:
              <input
                type="file"
                id="profile-pic"
                name="pic"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>
          </div>

          <button className="submit-btn" onClick={register}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;

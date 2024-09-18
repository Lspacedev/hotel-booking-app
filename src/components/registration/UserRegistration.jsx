import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import bcrypt from "bcryptjs-react";

import {
  getStorage,
  getDownloadURL,
  ref,
  listAll,
  uploadBytes,
} from "firebase/storage";

function UserRegistration() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const storage = getStorage();
  //navigation
  const navigation = useNavigate();

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }
  const uploadFile = (id, img) => {
    if (img === null) {
      alert("Please select an image");
      return;
    }
    const imageRef = ref(storage, `${id}/${img.name}`);

    uploadBytes(imageRef, img)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log(url);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function register() {
    createUserWithEmailAndPassword(
      auth,
      userDetails.email,
      userDetails.password
    )
      .then((res) => {
        const userId = res.user.uid;

        addUser(userId);
        alert("Registered successfully");
        navigation("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function addUser(userId) {
    try {
      const salt = await bcrypt.genSalt();
      let encryptedPass = await bcrypt.hash(userDetails.password, salt);

      await setDoc(doc(db, "users", userId), {
        name: userDetails.name,
        surname: userDetails.surname,
        email: userDetails.email,
        password: encryptedPass,
      });

      uploadFile(userId, profilePic);
    } catch (err) {
      console.log(err.message);
    }
  }
  function handleSubmit() {
    const email = document.querySelector("#email");
    const name = document.querySelector("#name");
    const surname = document.querySelector("#surname");
    const password = document.querySelector("#password");

    const isNameEmpty = name.value.trim() !== "";

    const isSurnameEmpty = surname.value.trim() !== "";

    const isPasswordValid =
      password.value.trim() !== "" && password.value.length >= 6;

    const isEmailValid = email.value.trim() !== "" && email.validity.valid;

    const isFormValid =
      isEmailValid && isPasswordValid && isNameEmpty && isSurnameEmpty;

    if (isFormValid) {
      register();
    } else {
      if (name.value.trim() === "") {
        const name_span = document.querySelector(".name > span.error");

        name_span.innerText = "Name cannot be empty";
      }
      if (surname.value.trim() === "") {
        const surname_span = document.querySelector(".surname > span.error");

        surname_span.innerText = "Surname cannot be empty";
      }
      if (password.value.trim() === "") {
        const password_span = document.querySelector(".password > span.error");

        password_span.innerText = "Password cannot be empty";
      }
      if (password.value.length < 6) {
        const password_span = document.querySelector(".password > span.error");

        password_span.innerText =
          "Password must be not be less than 6 characters";
      }
      if (isEmailValid !== true) {
        const email_span = document.querySelector(".email > span.error");

        email_span.innerText = "Email is not valid";
      }
    }
  }
  return (
    <div className="UserRegistration">
      <div className="register-img">
        <img src="images/login-register.jpg" alt="login" />
      </div>
      <div className="register-form-container">
        <h2>Create new account</h2>
        <div className="register-to-login">
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
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
              />
            </label>
          </div>

          <button className="submit-btn" onClick={handleSubmit}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserRegistration;

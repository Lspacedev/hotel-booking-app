import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";
import { collection, doc, addDoc, arrayUnion } from "firebase/firestore";
import {
  getStorage,
  getDownloadURL,
  ref,
  listAll,
  uploadBytes,
} from "firebase/storage";
import { storage } from "../../config/firebase";

function UserRegistration() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState("");


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
      .then(() => {
        addUser();
        alert("Registered successfully");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function addUser() {
    try {
      const usersCollection = collection(db, "users");
      const userRef = doc(usersCollection, user);

      const docRef = await addDoc(userRef, {name:userDetails.name, surname: userDetails.surname, email:userDetails.email});
      uploadFile(docRef.id, profilePic);
      alert("added user");
    } catch (err) {
      console.log(err);
    }
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
                onChange={(e) => {
                  setProfilePic(e.target.files[0]);
                }}
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

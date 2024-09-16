import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";

import { sendPasswordResetEmail, updateEmail, signOut } from "firebase/auth";
import { deleteDoc, updateDoc, collection, doc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import bcrypt from "bcryptjs-react";
function UserProfile({ userId }) {
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, userId);
      let result = await listAll(imagesRef);
      let urlPromises = result.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );
      console.log(urlPromises);
      return Promise.all(urlPromises);
    };
    const loadImages = async () => {
      const url = await fetchImages();
      console.log(url);
      setProfilePic(url[0]);
    };
    if (typeof userId !== "undefined") {
      loadImages();
    }
  }, [userId]);
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [update, setUpdate] = useState(false);

  const isLoading = false;
  //get user from firestore
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user] = users.filter((user) => user.id === currentUser);

  const storage = getStorage();

  function handleDeleteAccount() {
    //delet user in firestore
    navigation("/");
  }

  async function handleSubmit() {
    //update firestore with obj
    //check if properties are empty

    let updatedObj = {};
    let encryptedPass;
    if (userUpdate.name !== "") {
      updatedObj.name = userUpdate.name;
    }
    if (userUpdate.surname !== "") {
      updatedObj.surname = userUpdate.name;
    }
    if (userUpdate.email !== "") {
      updatedObj.email = userUpdate.email;
      // updateEmail(auth.currentUser, userUpdate.email)
      //   .then(() => {
      //     // Email updated!
      //     alert("Please re login");
      //     signOut(auth)
      //       .then(() => {
      //         navigation("/");
      //       })
      //       .catch((err) => {});
      //     // ...
      //   })
      //   .catch((error) => {
      //     // An error occurred
      //     // ...
      //   });
    }

    //update users to firestore
    try {
      const usersCollection = collection(db, "users");
      const userRef = doc(usersCollection, currentUser);

      if (JSON.stringify(updatedObj) !== "{}") {
        await updateDoc(userRef, updatedObj);
        alert("Updated successfully");
      } else {
        alert("Nothing to update");
      }
    } catch (err) {
      console.log(err);
    }
    setUpdate(false);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserUpdate((prev) => ({ ...prev, [name]: value }));
  }
  async function resetPassword() {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        alert("Check your email");
      })
      .catch((err) => {});
  }

  function getProfilePic(pic) {
    if (pic === "") {
      return "/images/profile.png";
    } else {
      return pic;
    }
  }
  return (
    <div className="UserProfile">
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                {/* <label htmlFor="profile-pic2">
                  Profile picture:
                  <input
                    type="file"
                    id="profile-pic2"
                    name="pic"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </label> */}
                <button className="close" onClick={() => setUpdate(false)}>
                  x
                </button>
              </div>
            ) : (
              <div className="profile-pic">
                {profilePic !== "" && <img src={profilePic} />}
              </div>
            )}
          </div>
          <div className="profile-content">
            <h2>Account details</h2>
            <div className="name-div">
              <h4>Name</h4>
              {update ? (
                <div className="name">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.name}
                  />
                </div>
              ) : (
                <div>{user && user.name}</div>
              )}
            </div>

            <div className="surname-div">
              <h4>Surname</h4>
              {update ? (
                <div className="surname">
                  <input
                    type="text"
                    id="surname"
                    name="surname"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.surname}
                  />
                </div>
              ) : (
                <div>{user && user.surname}</div>
              )}
            </div>

            <div className="email-div">
              <h4>Email</h4>
              {update ? (
                <div className="email">
                  <div>{user && user.email}</div>
                  {/* <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={userUpdate.email}
                  /> */}
                </div>
              ) : (
                <div>{user && user.email}</div>
              )}
            </div>

            <div className="user-pass">
              <div className="pass">
                <h4>Password:</h4>
                {update ? (
                  <div>
                    <div className="password">
                      {/* <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={userUpdate.password}
                      /> */}
                      <button onClick={resetPassword}>reset password</button>
                    </div>
                  </div>
                ) : (
                  <div className="password-text">{user && user.password}</div>
                )}
              </div>
            </div>
            <div className="account-delete-update">
              <button
                onClick={() => (update ? handleSubmit() : setUpdate(true))}
              >
                {update ? "Submit" : "Update"}
              </button>

              {/* <button id="account-delete" onClick={handleDeleteAccount}>
                Delete my account
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserProfile;

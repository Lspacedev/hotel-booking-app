import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../config/firebase";
import { db } from "../../config/firebase";

import { sendPasswordResetEmail } from "firebase/auth";
import { updateDoc, collection, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function UserProfile({ userId }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const [userUpdate, setUserUpdate] = useState({
    name: "",
    surname: "",
    email: "",
  });
  const [profilePic, setProfilePic] = useState("");
  const [update, setUpdate] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const isLoading = false;
  //get user from firestore
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user] = users.filter((user) => user.id === currentUser);
  console.log({ user, users, currentUser });
  useEffect(() => {
    if (typeof user !== "undefined") {
      setLoading(false);
      setUserUpdate((prev) => ({ ...prev, name: user.name }));
      setUserUpdate((prev) => ({ ...prev, surname: user.surname }));
      setUserUpdate((prev) => ({ ...prev, email: user.email }));
    } else {
      setLoading(true);
    }
  }, [user]);
  const storage = getStorage();

  async function handleSubmit() {
    //update firestore with obj
    //check if properties are empty

    let updatedObj = {};
    if (userUpdate.name !== "") {
      updatedObj.name = userUpdate.name;
    }
    if (userUpdate.surname !== "") {
      updatedObj.surname = userUpdate.surname;
    }

    // update users to firestore
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
    navigation(0);
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
      .catch((err) => {
        console.log(err);
      });
  }

  function handleToggleUpdate() {
    if (user.name === "Guest") {
      alert("Cannot update a guest account");
      return;
    }
    setUpdate(true);
  }

  if (loading) return <div className="Loading">Loading...</div>;

  return (
    <div className="UserProfile">
      {loading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                <button className="close" onClick={() => setUpdate(false)}>
                  <CgClose />
                </button>
              </div>
            ) : (
              <div className="profile-pic">
                {user && (
                  <img
                    src={
                      user.profilePic !== ""
                        ? user.profilePic
                        : "/images/profile.png"
                    }
                  />
                )}
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
              {!update && <h4>Email</h4>}
              {update ? (
                <div className="email"></div>
              ) : (
                <div>{user && user.email}</div>
              )}
            </div>

            <div className="user-pass">
              <div className="pass">
                {update ? (
                  <div>
                    <h4>Password:</h4>
                    <div className="password">
                      <button onClick={resetPassword}>reset password</button>
                    </div>
                  </div>
                ) : (
                  <div className="password-text"></div>
                )}
              </div>
            </div>
            <div className="account-update">
              <button
                onClick={() => (update ? handleSubmit() : handleToggleUpdate())}
              >
                {update ? "Submit" : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default UserProfile;

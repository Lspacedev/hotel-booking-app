import { useState } from "react";

function AdminProfile() {
  const [adminUpdate, setAdminUpdate] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [update, setUpdate] = useState(false);
  const isLoading = false;
  //get admin from firestore
  const admin = {};
  function handleDeleteAccount() {
    //delet admin in firestore
    navigation("/");
  }

  function handleSubmit(obj) {
    //update firestore with obj
    setUpdate(false);
  }

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setAdminUpdate((prev) => ({ ...prev, [name]: value }));
  }

  function handleImageUpload(e) {
    let input = document.getElementById("profile-pic2");
    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function (event) {
      setAdminUpdate({
        ...adminUpdate,
        profilePic: event.target.result,
      });
    };
  }
  function getProfilePic(obj) {
    if (obj.profilePic === "") {
      return "/images/profile.png";
    } else {
      return obj.profilePic;
    }
  }
  return (
    <div className="AdminProfile">
      {isLoading === true ? (
        <div>Loading...</div>
      ) : (
        <div className="contact-details">
          <div className="profile-picture">
            {update ? (
              <div className="profile-pic2">
                <label htmlFor="profile-pic2">
                  Profile picture:
                  <input
                    type="file"
                    id="profile-pic2"
                    name="pic"
                    onChange={(e) => handleImageUpload(e)}
                  />
                </label>
                <button className="close" onClick={() => setUpdate(false)}>
                  x
                </button>
              </div>
            ) : (
              <div className="profile-pic">
                {admin && <img src={getProfilePic(admin)} alt="profile" />}
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
                    value={adminUpdate.name}
                  />
                </div>
              ) : (
                <div>{admin && admin.name}</div>
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
                    value={adminUpdate.surname}
                  />
                </div>
              ) : (
                <div>{admin && admin.surname}</div>
              )}
            </div>

            <div className="email-div">
              <h4>Email</h4>
              {update ? (
                <div className="email">
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => handleChange(e)}
                    value={adminUpdate.email}
                  />
                </div>
              ) : (
                <div>{admin && admin.email}</div>
              )}
            </div>

            <div className="admin-pass">
              <div className="pass">
                <h4>Password:</h4>
                {update ? (
                  <div>
                    <div className="password">
                      <input
                        type="text"
                        id="password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={adminUpdate.password}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="password-text">{admin && admin.password}</div>
                )}
              </div>
            </div>
            <div className="account-delete-update">
              <button
                onClick={() =>
                  update ? handleSubmit(adminUpdate) : setUpdate(true)
                }
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
export default AdminProfile;

import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";

function Nav() {
  const [profilePic, setProfilePic] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const storage = getStorage();

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, user);
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
    if (typeof user !== "undefined") {
      loadImages();
    }
  }, [user]);
  const navigation = useNavigate();
  function navigateLogin() {
    navigation("/login");
  }
  function navigateRegister() {
    navigation("/registration");
  }
  function navigateProfile() {
    navigation("/home/profile");
  }
  return (
    <div className="Nav">
      <div className="logo">ZaHotels.com</div>
      <div className="nav-links">
        <div>Discover</div>
        {user === "" ? (
          <>
            <div onClick={navigateLogin}>Login</div>

            <button className="register-btn" onClick={navigateRegister}>
              Register
            </button>
          </>
        ) : (
          <div className="profile-icon" onClick={navigateProfile}>
            <img src={profilePic} />
          </div>
        )}
      </div>
    </div>
  );
}
export default Nav;

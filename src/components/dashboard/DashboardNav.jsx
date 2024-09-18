import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { IoIosNotificationsOutline } from "react-icons/io";

function DashboardNav() {
  const [profilePic, setProfilePic] = useState("");
  const userId = useSelector((state) => state.user.currentUser);
  const users = useSelector((state) => state.user.users);

  const [user] = users.filter((user) => user.id == userId);
  const storage = getStorage();

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, userId);
      let result = await listAll(imagesRef);
      if (typeof imagesRef.url !== "undefined") {
        let urlPromises = result.items.map((imageRef) =>
          getDownloadURL(imageRef)
        );
        return Promise.all(urlPromises);
      } else {
        return [""];
      }
    };
    const loadImages = async () => {
      const url = await fetchImages();
      setProfilePic(url[0]);
    };
    if (typeof user !== "undefined") {
      loadImages();
    }
  }, []);

  const navigation = useNavigate();
  function navigateDiscover() {
    navigation("/");
  }
  function navigateProfile() {
    navigation("/home/profile");
  }

  return (
    <div className="DashboardNav">
      <p onClick={navigateDiscover}>Discover</p>
      <div className="dropdown">
        <div className="dropbtn">
          <IoIosNotificationsOutline />
          <span>{user && user.notifications.length}</span>
        </div>
        <div className="notification-content">
          <ul>
            {user &&
              user.notifications.map((notification, i) => (
                <li key={i}>{notification.message}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className="profile" onClick={navigateProfile}>
        <div className="profile-icon" onClick={navigateProfile}>
          <img src={profilePic !== "" ? profilePic : "/images/profile.png"} />
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;

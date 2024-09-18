import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";

function DashboardNav() {
  const [profilePic, setProfilePic] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const storage = getStorage();

  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, user);
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
  }, [user]);

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

      <div className="profile" onClick={navigateProfile}>
        <div className="profile-icon" onClick={navigateProfile}>
          <img src={profilePic !== "" ? profilePic : "/images/profile.png"} />
        </div>
      </div>
    </div>
  );
}

export default DashboardNav;

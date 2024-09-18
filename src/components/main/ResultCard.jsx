import { useNavigate } from "react-router-dom";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useEffect, useState } from "react";

import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { IoStarSharp } from "react-icons/io5";

function ResultCard({ result }) {
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);

  const navigation = useNavigate();

  const storage = getStorage();
  useEffect(() => {
    const fetchImages = async () => {
      const imagesRef = ref(storage, result.id);

      let results = await listAll(imagesRef);
      let urlPromises = results.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setImages(urls);
    };
    loadImages();
  }, []);

  const user = useSelector((state) => state.user.currentUser);
  function handleNavigateSubPage() {
    navigation(`/results/${result.id}`);
  }
  async function addToFavourites() {
    try {
      const usersCollection = collection(db, "users");
      const userRef = doc(usersCollection, user);

      await updateDoc(userRef, {
        favourites: arrayUnion({
          id: result.id,
          room_name: result.room_name,
          rating: result.rating,
        }),
      });

      alert("added favourite");
    } catch (err) {
      console.log(err);
    }
    setLiked(true);
  }
  let arr = [];
  function printStars(num) {
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
  }
  printStars(Number(result.rating));
  return (
    <div className="ResultCard">
      <div className="img" onClick={handleNavigateSubPage}>
        <img src={images[0]} />
      </div>
      <div className="result-card-info">
        <div className="side-one">
          <h4>{result.room_name}</h4>
          <h6>{result.hotel_name}</h6>
          <p>{arr && arr.map(() => <IoStarSharp className="star" />)}</p>
          <p>{result.description}</p>
        </div>
        <div className="side-two">
          <p>R{result.price}</p>
          <button
            className="like-btn"
            onClick={liked ? console.log("liked") : addToFavourites}
          >
            {liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ResultCard;

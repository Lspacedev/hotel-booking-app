import { useNavigate } from "react-router-dom";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, listAll } from "firebase/storage";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
import { IoStarSharp } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
function ResultCard({ result }) {
  const [images, setImages] = useState([]);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigate();

  const storage = getStorage();

  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [user] = users.filter((user) => user.id === currentUser);

  useEffect(() => {
    if (user && user.favourites.length > 0) {
      const favourite = user.favourites.filter(
        (favourite) => favourite.id === result.id
      );
      if (favourite.length > 0) {
        setLiked(true);
      }
    }
  }, [user]);

  function handleNavigateSubPage() {
    navigation(`/results/${result.id}`);
  }
  async function addToFavourites() {
    if (user === "" || typeof user === "undefined") {
      alert("Please Login or Register an account.");
      return;
    }
    try {
      const usersCollection = collection(db, "users");
      const userRef = doc(usersCollection, currentUser);

      await updateDoc(userRef, {
        favourites: arrayUnion({
          id: result.id,
          room_name: result.room_name,
          rating: result.rating,
          imageUrl: result.images[0],
        }),
      });

      navigation(0);
    } catch (err) {
      console.log(err);
    }
    // setLiked(true);
  }
  let arr = [];
  function printStars(num) {
    for (let i = 0; i < num; i++) {
      arr.push(0);
    }
  }
  printStars(Number(result.rating));
  // if (loading) return <div className="Loading">Loading...</div>;
  return (
    <div className="ResultCard">
      <div className="img" onClick={handleNavigateSubPage}>
        {result && result.images.length > 0 && <img src={result.images[0]} />}
      </div>
      <div className="result-card-info">
        <div className="side-one">
          <h4>{result.room_name}</h4>
          <h6>{result.hotel_name}</h6>
          <p>
            {arr &&
              arr.map((elem, i) => <IoStarSharp key={i} className="star" />)}
          </p>
          <p>{result.description}</p>
        </div>
        <div className="side-two">
          <p>R{result.price}</p>
          <button
            className="like-btn"
            onClick={liked ? console.log("liked") : addToFavourites}
          >
            {liked ? (
              <MdFavorite className="icon" color="red" />
            ) : (
              <MdFavoriteBorder className="icon" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
export default ResultCard;

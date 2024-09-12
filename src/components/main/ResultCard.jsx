import { useNavigate } from "react-router-dom";
import { collection, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useSelector } from "react-redux";
function ResultCard({ result }) {
  const navigation = useNavigate();
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
          room_name: result.room_name,
          rating: result.rating,
        }),
      });

      alert("added favourite");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="ResultCard">
      <div className="img" onClick={handleNavigateSubPage}></div>
      <div className="result-card-info">
        <div className="side-one">
          <h4>{result.room_name}</h4>
          <h6>{result.hotel_name}</h6>
          <p>{result.rating}</p>
          <p>{result.description}</p>
        </div>
        <div className="side-two">
          <p>{result.price}</p>
          <button className="like-btn" onClick={addToFavourites}>
            Like
          </button>
        </div>
      </div>
    </div>
  );
}
export default ResultCard;
